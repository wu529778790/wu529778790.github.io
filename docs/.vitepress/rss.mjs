import fs from 'fs'
import path from 'path'

const docsDir = path.resolve(process.cwd(), 'docs')
const distDir = path.resolve(process.cwd(), 'docs/.vitepress/dist')

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

function extractExcerpt(content) {
  const body = content.replace(/^---[\s\S]*?---\s*/, '')
  const paragraphs = body
    .split('\n\n')
    .map(p => p
      .replace(/^#+\s+.*$/gm, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`~]/g, '')
      .replace(/<[^>]+>/g, '')
      .trim()
    )
    .filter(p => p.length > 10)
  return paragraphs[0] || ''
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

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
      if (fm.title && fm.date) {
        const url = fullPath
          .replace(docsDir, '')
          .replace(/\.md$/, '.html')
          .replace(/\/index\.html$/, '/')
        posts.push({
          title: fm.title,
          url,
          date: new Date(fm.date),
          excerpt: extractExcerpt(content),
        })
      }
    }
  }
  return posts
}

export async function generateRssFeed(siteUrl, siteTitle, siteDesc) {
  const posts = scanPosts(docsDir)
  posts.sort((a, b) => b.date.getTime() - a.date.getTime())

  const lastBuildDate = new Date().toUTCString()
  const items = posts.slice(0, 50).map(p => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${siteUrl}${p.url}</link>
      <guid isPermaLink="true">${siteUrl}${p.url}</guid>
      <pubDate>${p.date.toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(siteDesc)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`

  fs.writeFileSync(path.join(distDir, 'feed.xml'), rss)
  console.log(`[rss] Generated ${Math.min(posts.length, 50)} items -> feed.xml`)
}
