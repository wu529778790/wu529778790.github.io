// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import BlogLayout from './layouts/BlogLayout.vue'
import TagCloud from './components/TagCloud.vue'
import Archive from './components/Archive.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: BlogLayout,
  enhanceApp({ app }) {
    app.component('TagCloud', TagCloud)
    app.component('Archive', Archive)
  },
} satisfies Theme
