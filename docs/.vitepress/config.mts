import { defineConfig, getThemeConfig } from '@sugarat/theme/node'
import { generateSidebar, generateNav } from './sidebar.mjs'
import buildFix from './build-fix.js'

const blogTheme = getThemeConfig({
  author: '神族九帝',
  blog: true,
  home: {
    name: '神族九帝',
    motto: '前端技术博客 - 面试题、学习笔记、AI探索',
    inspiring: '记录学习，分享知识',
    pageSize: 10
  },
  search: {
    btnPlaceholder: '搜索',
    placeholder: '搜索文档',
    emptyText: '未找到结果',
    heading: '共 {{searchResult}} 条搜索结果'
  },
  themeColor: 'vp-green',
  footer: {
    version: true,
    copyright: '© 2015-present 神族九帝',
  },
  backToTop: true,
  darkTransition: true,
})

// 自动生成顶部导航和侧边栏
const autoNav = generateNav()
const autoSidebar = generateSidebar()

export default defineConfig({
  extends: blogTheme,
  title: '神族九帝',
  description: '前端技术博客 - 面试题、学习笔记、AI探索',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  markdown: {
    html: false,
  },

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => {
          return !tag.startsWith('VP') && !tag.startsWith('VPL')
        }
      }
    }
  },

  vite: {
    plugins: [buildFix()],
    server: {
      hmr: {
        overlay: false
      }
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: '神族九帝' }],
    ['meta', { name: 'keywords', content: '前端,面试题,JavaScript,Vue,React,TypeScript,AI' }],
  ],

  themeConfig: {
    siteTitle: '神族九帝',
    nav: autoNav,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wu529778790' }
    ],
    sidebar: autoSidebar,
  }
})
