#!/usr/bin/env node
/**
 * 自动补 front matter 脚本
 *
 * 用法：
 *   node scripts/auto-frontmatter.mjs          # 一次性扫描并补齐（generate 前自动执行）
 *   node scripts/auto-frontmatter.mjs --watch  # 监听 docs 目录，新建/变更 md 时自动补齐并重跑 generate
 *
 * 规则：
 *   - 只补「缺失」的字段，绝不覆盖已存在的 title/date/permalink/categories/tags
 *   - title   ：优先取正文第一个 H1，否则用文件名（去数字前缀）
 *   - date    ：文件修改时间（新建即当前时间），格式 YYYY-MM-DD HH:mm:ss
 *   - permalink：/pages/<文件名slug>/
 *   - categories：按目录推断（10.Agent → Agent学习笔记 / 09.AI → AI / 20.笔记 → 学习笔记 等）
 *   - tags    ：从标题提取英文/数字词组，没有则留空
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const docsDir = path.resolve(process.cwd(), 'docs')
const WATCH = process.argv.includes('--watch')

// 排除项需与 scripts/generate-posts.mjs 保持一致
const SKIP_DIRS = new Set(['node_modules', '@pages', '_posts', '.vitepress', 'public', 'dist', 'cache', '.git'])

// 目录 → 分类映射（注意顺序：更具体的路径在前）
const CATEGORY_MAP = [
  ['10.Agent', 'Agent学习笔记'],
  ['09.AI', 'AI'],
  ['10.面试题', '面试题'],
  ['20.笔记', '学习笔记'],
  ['31.服务器', '服务器'],
]

function fmtDate(d) {
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

function inferTitle(content, filename) {
  const h1 = content.match(/^#\s+(.+)$/m)
  if (h1 && h1[1].trim()) return h1[1].trim()
  return filename.replace(/\.md$/, '').replace(/^\d+\.\s*/, '').replace(/^\d+\./, '')
}

function slugify(filename) {
  return filename
    .replace(/\.md$/, '')
    .replace(/^\d+\.\s*/, '')
    .replace(/^\d+\./, '')
    .replace(/[，。、；：？！,.;:!?()（）\[\]【】"'“”‘’《》<>]/g, '')
    .replace(/\s+/g, '-')
}

function inferTags(title) {
  const en = title.match(/[A-Za-z][A-Za-z0-9._\-]*/g)
  return en ? [...new Set(en)] : []
}

function inferCategory(relPath) {
  for (const [key, category] of CATEGORY_MAP) {
    if (relPath.includes(key)) return category
  }
  return '学习笔记'
}

function yamlSafe(value) {
  return /[:#"{}[\]]/.test(value) ? `"${value.replace(/"/g, '\\"')}"` : value
}

function buildHeader({ title, date, permalink, category, tags }) {
  const lines = ['---', `title: ${yamlSafe(title)}`, `date: ${date}`, `permalink: ${permalink}`, 'categories:', `  - ${category}`]
  if (tags.length) {
    lines.push('tags:')
    tags.forEach((t) => lines.push(`  - ${t}`))
  } else {
    lines.push('tags: []')
  }
  lines.push('---')
  return lines.join('\n')
}

function parseFrontmatterKeys(content) {
  const m = content.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!m) return []
  const keys = []
  for (const line of m[1].split('\n')) {
    const km = line.match(/^(\w[\w-]*):/)
    if (km) keys.push(km[1])
  }
  return keys
}

/** 确保单个文件有完整 front matter，返回是否发生了修改 */
function ensureFrontmatter(file) {
  const rel = path.relative(docsDir, file)
  const filename = path.basename(file)
  let content = fs.readFileSync(file, 'utf-8')
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1) // 兼容 BOM
  const title = inferTitle(content, filename)
  const date = fmtDate(fs.statSync(file).mtime)
  const permalink = `/pages/${slugify(filename)}/`
  const category = inferCategory(rel)
  const tags = inferTags(title)

  // 宽松判断：文件开头只要出现 front matter 起始标记，就绝不插入第二个 header
  const hasFrontmatter = /^\s*---\s*\n/.test(content)
  if (!hasFrontmatter) {
    // 完全无 front matter（典型的新建文件）：插入完整 header
    const header = buildHeader({ title, date, permalink, category, tags })
    fs.writeFileSync(file, header + '\n\n' + content)
    return true
  }

  // 已有 front matter：仅补 generate-posts 必需字段（title/date），
  // 不覆盖已有值、不补 categories/tags/permalink，避免侵入旧文件
  const keys = parseFrontmatterKeys(content)
  const add = []
  if (!keys.includes('title')) add.push(`title: ${yamlSafe(title)}`)
  if (!keys.includes('date')) add.push(`date: ${date}`)
  if (!add.length) return false

  const m = content.match(/^---\s*\n[\s\S]*?\n---/)
  const headEnd = m[0].length // 结尾「---」位于文件开头，直接按长度定位
  content = content.slice(0, headEnd - 3) + '\n' + add.join('\n') + content.slice(headEnd - 3)
  fs.writeFileSync(file, content)
  return true
}

/** 扫描 docs 下所有 md（排除 index.md 与黑名单目录），返回修复的文件数 */
function scanAndFix() {
  let fixed = 0
  const walk = (dir) => {
    let entries
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue
      if (SKIP_DIRS.has(entry.name)) continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
        try {
          if (ensureFrontmatter(full)) {
            fixed++
            console.log(`[auto-frontmatter] 已补 front matter: ${path.relative(process.cwd(), full)}`)
          }
        } catch (err) {
          console.error(`[auto-frontmatter] 处理失败: ${full}`, err.message)
        }
      }
    }
  }
  walk(docsDir)
  return fixed
}

function runGenerate() {
  const res = spawnSync('npm', ['run', 'generate'], { cwd: process.cwd(), stdio: 'inherit' })
  if (res.status !== 0) console.error('[auto-frontmatter] generate 失败')
}

if (WATCH) {
  // ── watch 模式：监听 docs 目录 ──
  let timer = null
  fs.watch(docsDir, { recursive: true }, (event, filename) => {
    if (!filename) return
    const name = filename.toString()
    if (!name.endsWith('.md') || name.includes('.vitepress')) return
    clearTimeout(timer)
    timer = setTimeout(() => {
      const fixed = scanAndFix()
      if (fixed > 0) runGenerate() // 列表数据同步更新，VitePress 热更新
    }, 500)
  })
  console.log('[auto-frontmatter] 已启动监听：新建/修改 md 将自动补齐 front matter')
} else {
  // 一次性模式：generate 链中已包含 generate-posts，无需在此重跑
  const fixed = scanAndFix()
  console.log(`[auto-frontmatter] 扫描完成，补齐 ${fixed} 个文件`)
}
