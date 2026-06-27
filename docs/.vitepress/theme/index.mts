// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { watch } from 'vue'
import { inBrowser } from 'vitepress'
import PostList from './components/PostList.vue'
import TagCloud from './components/TagCloud.vue'
import Archive from './components/Archive.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PostList', PostList)
    app.component('TagCloud', TagCloud)
    app.component('Archive', Archive)
  },
  setup() {
    if (!inBrowser) return
    // Collect post data from pages
    const posts: any[] = []
    const modules = import.meta.glob('/docs/**/*.md', { eager: true })
    for (const path in modules) {
      const mod = modules[path] as any
      const fm = mod.frontmatter
      if (fm && fm.title && fm.date) {
        posts.push({
          title: fm.title,
          date: fm.date,
          categories: fm.categories || [],
          tags: fm.tags || [],
          url: path.replace('/docs', '').replace(/\.md$/, '.html').replace(/\/index\.html$/, '/'),
          sticky: fm.sticky,
        })
      }
    }
    // Make posts available to theme data
    if (typeof window !== 'undefined') {
      ;(window as any).__BLOG_POSTS__ = posts
    }
  },
} satisfies Theme
