import fs from 'fs'
import path from 'path'

const docsDir = path.resolve(process.cwd(), 'docs')
const distDir = path.resolve(process.cwd(), 'docs/.vitepress/dist')

// 提取 frontmatter
function extractFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!match) return {}
  const lines = match[1].split('\n')
  const fm = {}
  for (const line of lines) {
    const m = line.match(/^(\w[\w-]*):\s*(.+)$/)
    if (m) fm[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
  }
  return fm
}

// 扫描所有文章
function scanPosts(dir) {
  const posts = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      posts.push(...scanPosts(fullPath))
    } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
      const content = fs.readFileSync(fullPath, 'utf-8')
      const fm = extractFrontmatter(content)
      const url = fullPath
        .replace(docsDir, '')
        .replace(/\.md$/, '.html')
        .replace(/\/index\.html$/, '/')
      posts.push({
        url,
        date: fm.date ? new Date(fm.date) : new Date(),
        title: fm.title || entry.name.replace('.md', ''),
      })
    }
  }
  return posts
}

export async function generateSitemap(siteUrl) {
  const posts = scanPosts(docsDir)
  posts.sort((a, b) => b.date.getTime() - a.date.getTime())

  const now = new Date().toISOString().split('T')[0]
  const urls = posts.map(p => `  <url>
    <loc>${siteUrl}${p.url}</loc>
    <lastmod>${p.date.toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${urls}
</urlset>
`

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)
  console.log(`[sitemap] Generated ${posts.length + 1} URLs -> sitemap.xml`)
}
