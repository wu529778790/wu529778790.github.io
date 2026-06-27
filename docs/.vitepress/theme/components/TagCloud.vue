<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBlog } from '../composables/useBlog'

const { allTags, posts } = useBlog()
const selectedTag = ref('')

const filteredPosts = computed(() => {
  if (!selectedTag.value) return []
  return posts.filter(p => p.tags.includes(selectedTag.value))
})

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>

<template>
  <div class="tags-page">
    <div class="tag-cloud">
      <span
        v-for="tag in allTags"
        :key="tag.name"
        class="tag-item"
        :class="{ active: selectedTag === tag.name }"
        @click="selectedTag = selectedTag === tag.name ? '' : tag.name"
      >
        # {{ tag.name }}
        <span class="tag-count">{{ tag.count }}</span>
      </span>
    </div>

    <div v-if="selectedTag" class="tag-posts">
      <h3># {{ selectedTag }} ({{ filteredPosts.length }})</h3>
      <div v-for="post in filteredPosts" :key="post.url" class="tag-post-item">
        <span class="tag-post-date">{{ formatDate(post.date) }}</span>
        <a :href="post.url">{{ post.title }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}
.tag-item {
  padding: 6px 14px;
  border-radius: 20px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  user-select: none;
}
.tag-item:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.tag-item.active {
  color: white;
  background: var(--vp-c-brand-1);
}
.tag-count {
  font-size: 12px;
  opacity: 0.7;
  margin-left: 2px;
}
.tag-posts h3 {
  margin: 0 0 16px;
  color: var(--vp-c-text-1);
}
.tag-post-item {
  padding: 8px 0;
  display: flex;
  gap: 12px;
  align-items: baseline;
  border-bottom: 1px solid var(--vp-c-divider);
}
.tag-post-date {
  font-size: 13px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}
.tag-post-item a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.tag-post-item a:hover {
  color: var(--vp-c-brand-1);
}
</style>
