import fs from 'fs'
import path from 'path'

// 扫描 docs 目录
const blogDir = path.resolve(process.cwd(), 'docs')

// 从 md 文件中提取标题
function getTitleFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')

    // 优先从 frontmatter 提取
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/)
    if (frontmatterMatch) {
      const titleMatch = frontmatterMatch[1].match(/title:\s*["']?([^"'\n]+)["']?/)
      if (titleMatch) {
        return titleMatch[1].trim()
      }
    }

    // 从第一个 # 标题提取
    const h1Match = content.match(/^#\s+(.+)$/m)
    if (h1Match) {
      return h1Match[1].trim()
    }

    return null
  } catch (e) {
    return null
  }
}

// 从目录的 index.md 中提取标题
function getTitleFromIndexFile(dirPath) {
  const indexPath = path.join(dirPath, 'index.md')
  if (fs.existsSync(indexPath)) {
    return getTitleFromFile(indexPath)
  }
  return null
}

// 清理文件名（去掉序号前缀）
function cleanName(name) {
  return name.replace(/^\d+[\.\-]\s*/, '')
}

// 数字感知的自然比较：2 < 10 < 100，且忽略 .md 后缀
function naturalCompare(a, b) {
  const keyA = String(a).replace(/\.md$/, '')
  const keyB = String(b).replace(/\.md$/, '')
  const ta = keyA.split(/(\d+)/).filter(Boolean)
  const tb = keyB.split(/(\d+)/).filter(Boolean)
  const len = Math.max(ta.length, tb.length)
  for (let i = 0; i < len; i++) {
    const x = ta[i]
    const y = tb[i]
    if (x === undefined) return -1
    if (y === undefined) return 1
    if (x !== y) {
      const xn = /^\d+$/.test(x)
      const yn = /^\d+$/.test(y)
      if (xn && yn) {
        const diff = parseInt(x, 10) - parseInt(y, 10)
        if (diff !== 0) return diff
      } else {
        return x < y ? -1 : 1
      }
    }
  }
  return 0
}

// 扫描目录生成侧边栏（文件与目录合并，统一按名称自然排序）
function scanDir(dir, basePath = '') {
  const items = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  // 收集所有文件与目录，统一排序
  const candidates = []

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue
    if (entry.name === 'index.md') continue

    if (entry.isFile() && entry.name.endsWith('.md')) {
      candidates.push({ entry, type: 'file' })
    } else if (entry.isDirectory()) {
      candidates.push({ entry, type: 'dir' })
    }
  }

  candidates.sort((a, b) => naturalCompare(a.entry.name, b.entry.name))

  for (const { entry, type } of candidates) {
    if (type === 'file') {
      const filePath = path.join(dir, entry.name)
      // 从文件中获取标题
      const title = getTitleFromFile(filePath)
      const name = title || cleanName(entry.name.replace(/\.md$/, ''))
      items.push({
        text: name,
        link: `${basePath}/${entry.name.replace(/\.md$/, '')}`
      })
    } else {
      const dirPath = path.join(dir, entry.name)
      const dirBasePath = `${basePath}/${entry.name}`

      // 检查目录下是否有 md 文件
      const hasMdFiles = hasMarkdownFiles(dirPath)
      if (!hasMdFiles) continue

      // 从目录的 index.md 获取标题
      const dirTitle = getTitleFromIndexFile(dirPath)
      const dirName = dirTitle || cleanName(entry.name)

      // 生成子项
      const subItems = scanDir(dirPath, dirBasePath)

      if (subItems.length > 0) {
        items.push({
          text: dirName,
          collapsed: true,
          items: subItems
        })
      }
    }
  }

  return items
}

// 检查目录下是否有 md 文件
function hasMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md')) return true
    if (entry.isDirectory()) {
      if (hasMarkdownFiles(path.join(dir, entry.name))) return true
    }
  }
  return false
}

// 生成完整的侧边栏配置
export function generateSidebar() {
  const sidebar = {}
  const entries = fs.readdirSync(blogDir, { withFileTypes: true })

  for (const entry of entries) {
    // 跳过特殊目录
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'public') continue
    if (!entry.isDirectory()) continue

    const dirPath = path.join(blogDir, entry.name)

    // 检查是否有 md 文件
    if (!hasMarkdownFiles(dirPath)) continue

    // 生成侧边栏
    const items = scanDir(dirPath, `/${entry.name}`)
    if (items.length > 0) {
      sidebar[`/${entry.name}/`] = items
    }
  }

  return sidebar
}

// 生成顶部导航
export function generateNav() {
  const nav = [{ text: '首页', link: '/' }]
  const entries = fs.readdirSync(blogDir, { withFileTypes: true })

  for (const entry of entries) {
    // 跳过特殊目录
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'public') continue
    if (!entry.isDirectory()) continue

    const dirPath = path.join(blogDir, entry.name)

    // 检查是否有 md 文件
    if (!hasMarkdownFiles(dirPath)) continue

    // 从目录的 index.md 获取标题
    const dirTitle = getTitleFromIndexFile(dirPath)
    const dirName = dirTitle || cleanName(entry.name)

    // 找到第一个 md 文件作为链接
    const firstFile = findFirstMarkdown(dirPath)
    if (firstFile) {
      nav.push({
        text: dirName,
        link: `/${entry.name}/${firstFile}`
      })
    }
  }

  return nav
}

// 找到目录下的第一个 md 文件
function findFirstMarkdown(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  // 先找文件
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
      return entry.name.replace(/\.md$/, '')
    }
  }

  // 再找子目录
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const result = findFirstMarkdown(path.join(dir, entry.name))
      if (result) return `${entry.name}/${result}`
    }
  }

  return null
}
