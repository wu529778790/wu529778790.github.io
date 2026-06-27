<script setup lang="ts">
import { useBlog } from '../composables/useBlog'

const { postsByDate, posts } = useBlog()

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>

<template>
  <div class="archive-page">
    <p class="archive-count">共 {{ posts.length }} 篇文章</p>
    <div v-for="[year, yearPosts] in postsByDate" :key="year" class="archive-year">
      <h2>{{ year }}</h2>
      <div v-for="post in yearPosts" :key="post.url" class="archive-item">
        <span class="archive-date">{{ formatDate(post.date) }}</span>
        <a :href="post.url">{{ post.title }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.archive-count {
  color: var(--vp-c-text-2);
  margin-bottom: 24px;
}
.archive-year {
  margin-bottom: 24px;
}
.archive-year h2 {
  font-size: 24px;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-brand-1);
  padding-bottom: 6px;
  display: inline-block;
}
.archive-item {
  padding: 6px 0;
  display: flex;
  gap: 12px;
  align-items: baseline;
}
.archive-date {
  font-size: 13px;
  color: var(--vp-c-text-3);
  font-family: monospace;
  white-space: nowrap;
}
.archive-item a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.archive-item a:hover {
  color: var(--vp-c-brand-1);
}
</style>
