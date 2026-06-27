// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import BlogLayout from './layouts/BlogLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: BlogLayout,
} satisfies Theme
