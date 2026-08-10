// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import BlogLayout from './layouts/BlogLayout.vue'
import PasswordLayout from './layouts/PasswordLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: BlogLayout,
  enhanceApp({ app }) {
    // 供 frontmatter `layout: PasswordLayout` 的受保护文章使用
    app.component('PasswordLayout', PasswordLayout)
  },
} satisfies Theme
