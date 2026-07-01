import { defineConfig } from 'vitepress'
import { generateSidebar, generateNav } from './sidebar.mjs'
import { generateSitemap } from './sitemap.mjs'
import { generateRssFeed } from './rss.mjs'

// 自动生成顶部导航和侧边栏
const autoNav = generateNav()
const autoSidebar = generateSidebar()

// 站点基础信息
const SITE_URL = 'https://blog.shenzjd.com'
const SITE_TITLE = '神族九帝'
const SITE_DESC = '前端技术博客 - 面试题、学习笔记、AI探索'

export default defineConfig({
  title: SITE_TITLE,
  description: SITE_DESC,
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  // 构建后生成 sitemap 和 RSS
  buildEnd: async () => {
    await generateSitemap(SITE_URL)
    await generateRssFeed(SITE_URL, SITE_TITLE, SITE_DESC)
  },

  markdown: {
    html: false,
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 2000,
    },
  },

  head: [
    ['link', { rel: 'icon', href: 'https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260701-180125-c1ub.webp' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['link', { rel: 'apple-touch-icon', href: 'https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260701-180125-c1ub.webp' }],
    ['meta', { name: 'theme-color', content: '#2563EB' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    ['meta', { name: 'author', content: '神族九帝' }],
    ['meta', { name: 'keywords', content: '前端,面试题,JavaScript,Vue,React,TypeScript,AI' }],
    // Open Graph 基础标签
    ['meta', { property: 'og:site_name', content: SITE_TITLE }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@shenzujiudi' }],
    // RSS 自动发现
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: `${SITE_TITLE} RSS`, href: '/feed.xml' }],
  ],

  // 动态生成每页的 OG 标签
  transformHead({ pageData }) {
    const head: Record<string, string>[] = []
    const url = `${SITE_URL}${pageData.relativePath === 'index.md' ? '/' : '/' + pageData.relativePath.replace('.md', '.html')}`
    const title = pageData.frontmatter?.title || pageData.title || SITE_TITLE
    const description = pageData.frontmatter?.description || pageData.description || SITE_DESC

    head.push(['meta', { property: 'og:title', content: title }])
    head.push(['meta', { property: 'og:description', content: description }])
    head.push(['meta', { property: 'og:url', content: url }])
    head.push(['meta', { name: 'twitter:title', content: title }])
    head.push(['meta', { name: 'twitter:description', content: description }])
    head.push(['meta', { name: 'description', content: description }])

    if (pageData.frontmatter?.cover) {
      head.push(['meta', { property: 'og:image', content: `${SITE_URL}${pageData.frontmatter.cover}` }])
      head.push(['meta', { name: 'twitter:image', content: `${SITE_URL}${pageData.frontmatter.cover}` }])
    }

    return head
  },

  themeConfig: {
    siteTitle: SITE_TITLE,
    nav: [
      { text: '首页', link: '/' },
      ...autoNav.filter((item: any) => item.text !== '首页'),
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wu529778790' }
    ],
    sidebar: autoSidebar,
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/wu529778790/wu529778790.github.io/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    footer: {
      copyright: '',
      message: ''
    }
  }
})
