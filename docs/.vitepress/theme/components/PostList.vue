<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBlog } from '../composables/useBlog'

const { posts } = useBlog()
const PAGE_SIZE = 10
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(posts.length / PAGE_SIZE))
const currentPosts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return posts.slice(start, start + PAGE_SIZE)
})

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function goToPage(page: number) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function prevPage() {
  if (currentPage.value > 1) goToPage(currentPage.value - 1)
}

function nextPage() {
  if (currentPage.value < totalPages.value) goToPage(currentPage.value + 1)
}

// 页码范围
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: (number | string)[] = []
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 4) pages.push('...')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i)
    }
    if (current < total - 3) pages.push('...')
    pages.push(total)
  }
  return pages
})
</script>

<template>
  <div class="post-list">
    <div v-for="post in currentPosts" :key="post.url" class="post-item">
      <h3 class="post-title">
        <a :href="post.url">{{ post.title }}</a>
        <span v-if="post.sticky" class="post-sticky">📌 置顶</span>
      </h3>
      <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}...</p>
      <div class="post-meta">
        <span class="post-date">{{ formatDate(post.date) }}</span>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="totalPages > 1" class="pagination">
      <button class="page-btn" :disabled="currentPage <= 1" @click="prevPage">‹</button>
      <template v-for="p in visiblePages" :key="p">
        <span v-if="p === '...'" class="page-dots">…</span>
        <button
          v-else
          class="page-btn"
          :class="{ active: p === currentPage }"
          @click="goToPage(p as number)"
        >
          {{ p }}
        </button>
      </template>
      <button class="page-btn" :disabled="currentPage >= totalPages" @click="nextPage">›</button>
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
  margin-top: 6px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}
.post-sticky {
  font-size: 13px;
  color: var(--vp-c-brand-1);
  margin-left: 6px;
}
.post-title {
  margin: 0 0 6px;
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
.post-excerpt {
  margin: 0 0 8px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 24px 0;
}
.page-btn {
  min-width: 32px;
  height: 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}
.page-btn:hover:not(:disabled):not(.active) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.page-btn.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}
.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.page-dots {
  padding: 0 4px;
  color: var(--vp-c-text-3);
}
</style>
