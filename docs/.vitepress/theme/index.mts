// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
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
} satisfies Theme
