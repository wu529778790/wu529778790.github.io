import { github, createSocialLinks, createAlgolia } from './setting.js';
import { generateMenu } from './utils.js'

generateMenu()
export default {
  base: '/',
  srcDir: 'src',
  cacheDir: 'cache',
  outDir: 'dist',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      }
    ]
  ],
  lastUpdated: true,
  useWebFonts: false,
  cleanUrls: true,
  title: '神族九帝',
  description: '神族九帝',
  lang: 'zh-CN',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    outline: 'deep',
    lastUpdatedText: '最近更新时间',
    editLink: {
      pattern: `${github}/blob/main/docs/:path`,
      text: '在 GitHub 上编辑此页面'
    },
    footer: {
      message: `神族九帝 的前端博客，欢迎 <a target="_blank" style="color: var(--vp-c-brand)" href="${github}">star ⭐</a>`,
      copyright: `<a target="_blank" href="${github}/blob/main/LICENSE">MIT License 神族九帝 </a> | 版权所有 © 2015-${new Date().getFullYear()}`
    },
    socialLinks: createSocialLinks(),
    algolia: createAlgolia(),

    nav: createNav(),
    sidebar: {
      // 专栏
      '/docs/special-column/vue/': createSpecialColumnSidebar(),
      // Py
      '/docs/py/basic/': createPySidebar(),
      // 面试
      '/docs/interview/': createInterviewSidebar(),
      // 随笔
      '/docs/essay': createEssaySidebar()
    }
  },
  vite: {
    server: {
      port: 8000
    },
    build: {
      // minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  }
}

/**
 * @description 导航 navbar
 */
function createNav() {
  return [
    {
      text: '📝 随笔',
      link: '/docs/essay/index',
      activeMatch: '/docs/essay/'
    },
    {
      text: '🔥 专栏',
      items: [
        {
          text: '😤 手撕源码',
          link: '/docs/special-column/vue/00-导读',
          activeMatch: '/docs/special-column/vue/'
        },
        {
          text: '🤔 前端算法',
          link: '/docs/special-column/vue/00-导读',
          activeMatch: '/docs/special-column/vue/'
        },
        {
          text: '🤖 前端运维',
          link: '/docs/special-column/vue/00-导读',
          activeMatch: '/docs/special-column/vue/'
        }
      ]
    },
    {
      text: '📝 Python',
      link: '/docs/py/basic/数据类型-运算符',
      activeMatch: '/docs/py/basic/数据类型-运算符'
    },
    {
      text: '🎉 面试',
      link: '/docs/interview/internet-questions',
      activeMatch: '/docs/interview/'
    },
    {
      text: '🎒 编程资源',
      items: [
        {
          text: '🔧 编程工具',
          link: '/docs/special-column/vue/00-导读',
          activeMatch: '/docs/special-column/vue/'
        },
        {
          text: '🔗 资源导航',
          link: '/docs/special-column/vue/00-导读',
          activeMatch: '/docs/special-column/vue/'
        }
      ]
    }
  ];
}

/**
 * @description 面试 sidebar
 */
function createInterviewSidebar() {
  return [
    {
      text: '',
      collapsed: false,
      items: [
        {
          text: '计算机网络',
          link: '/docs/interview/internet-questions'
        },
        { text: '浏览器', link: '/docs/interview/browser-questions' },
        { text: 'HTML、CSS', link: '/docs/interview/html-css' },
        { text: 'Javascript', link: '/docs/interview/javascript' },
        { text: 'TypeScript', link: '/docs/interview/typescript' },
        { text: '移动端', link: '/docs/interview/mobile' },
        { text: 'Vue2', link: '/docs/interview/vue2' },
        { text: 'React', link: '/docs/interview/react' },
        { text: 'Webpack', link: '/docs/interview/webpack' },
        { text: 'Vite', link: '/docs/interview/vite' },
        { text: 'Node', link: '/docs/interview/node' }
      ]
    }
  ];
}

/**
 * @description 专栏 sidebar
 */
function createSpecialColumnSidebar() {
  return [
    {
      text: '手写 Vue3',
      collapsed: false,
      items: [
        { text: '📚 导读', link: '/docs/special-column/vue/00-导读' },
        {
          text: '🌱 源码环境搭建',
          link: '/docs/special-column/vue/01-源码环境搭建'
        },
        {
          text: 'reactivity 响应式模块',
          // collapsed: false,
          items: [
            {
              text: 'reactiveApi 实现',
              link: '/docs/special-column/vue/02-reactiveApi实现'
            },
            {
              text: '依赖收集与更新 effect 的实现',
              link: '/docs/special-column/vue/03-依赖收集与更新'
            },
            {
              text: 'refApi 实现',
              link: '/docs/special-column/vue/04-refApi实现'
            },
            {
              text: 'computed 实现',
              link: '/docs/special-column/vue/05-computedApi'
            }
          ]
        },
        {
          text: '初始化渲染流程',
          link: '/docs/special-column/vue/06-初始化前置',
          // collapsed: false,
          items: [
            {
              text: '准备工作',
              link: '/docs/special-column/vue/06-初始化前置'
            },
            {
              text: 'createApp',
              link: '/docs/special-column/vue/07-初始化流程'
            },
            {
              text: 'Vue 中的类型及 createVNode',
              link: '/docs/special-column/vue/08-Vue类型'
            },
            {
              text: '组件创建流程',
              link: '/docs/special-column/vue/09-render'
            },
            {
              text: 'h 方法及元素挂载流程',
              link: '/docs/special-column/vue/10-挂载'
            }
          ]
        },
        {
          text: '组件、元素更新 diff算法',
          // collapsed: false,
          items: [
            {
              text: '更新流程开始及回顾',
              link: '/docs/special-column/vue/11-组件更新开始于回顾'
            },
          ]
        }
      ]
    }
  ];
}

/**
 * @description 随笔 sidebar
 */
function createEssaySidebar() {
  return [
    {
      text: 'NuxtJS',
      collapsed: false,
      items: [
        { text: 'Test 占位 0', link: '' },
        { text: 'Test 占位 1', link: '' }
      ]
    }
  ];
}

/**
 * @description Python sidebar
 */
function createPySidebar() {
  return [
    {
      text: 'Basic',
      collapsed: false,
      items: [
        { text: '数据类型、运算符', link: '/docs/py/basic/数据类型-运算符' },
        { text: '分支、循环、函数', link: '/docs/py/basic/循环-函数' },
      ]
    }
  ];
}
