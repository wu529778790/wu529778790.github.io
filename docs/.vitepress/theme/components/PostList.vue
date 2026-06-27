<script setup lang="ts">
import { useBlog } from '../composables/useBlog'

const { posts } = useBlog()

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
</script>

<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.url" class="post-item">
      <div class="post-meta">
        <span class="post-date">{{ formatDate(post.date) }}</span>
        <span v-if="post.sticky" class="post-sticky">📌 置顶</span>
      </div>
      <h3 class="post-title">
        <a :href="post.url">{{ post.title }}</a>
      </h3>
      <div class="post-tags">
        <span v-for="tag in post.tags" :key="tag" class="post-tag">
          <a :href="`/tags#${tag}`"># {{ tag }}</a>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-list {
  max-width: 740px;
  margin: 0 auto;
}
.post-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.post-item:last-child {
  border-bottom: none;
}
.post-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.post-sticky {
  color: var(--vp-c-brand-1);
}
.post-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
}
.post-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.post-title a:hover {
  color: var(--vp-c-brand-1);
}
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.post-tag {
  font-size: 12px;
}
.post-tag a {
  color: var(--vp-c-text-3);
  text-decoration: none;
  padding: 2px 8px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: all 0.2s;
}
.post-tag a:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
</style>
