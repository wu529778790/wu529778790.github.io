import { defineConfig } from 'vitepress'
import { generateSidebar, generateNav } from './sidebar.mjs'

// 自动生成顶部导航和侧边栏
const autoNav = generateNav()
const autoSidebar = generateSidebar()

export default defineConfig({
  title: '神族九帝',
  description: '前端技术博客 - 面试题、学习笔记、AI探索',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  markdown: {
    html: false,
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 2000,
    },
    logLevel: 'error',
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: '神族九帝' }],
    ['meta', { name: 'keywords', content: '前端,面试题,JavaScript,Vue,React,TypeScript,AI' }],
  ],

  themeConfig: {
    siteTitle: '神族九帝',
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
    footer: {
      copyright: '© 2015-present 神族九帝'
    }
  }
})
