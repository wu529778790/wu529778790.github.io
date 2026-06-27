<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import PostList from '../components/PostList.vue'
import GiscusComment from '../components/GiscusComment.vue'

const { Layout } = DefaultTheme
const route = useRoute()
const isHome = () => route.path === '/' || route.path === '/index.html' || route.path === '/index'
</script>

<template>
  <Layout>
    <template v-if="isHome()" #page-top>
      <div class="blog-page">
        <h1 class="blog-title">博客</h1>
        <PostList />
      </div>
    </template>
    <template #doc-footer-before>
      <GiscusComment v-if="!isHome()" />
    </template>
  </Layout>
</template>

<style scoped>
.blog-page {
  max-width: 740px;
  margin: 0 auto;
  padding: 24px 24px 0;
}
.blog-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--vp-c-text-1);
}
</style>
