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
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
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
    <!-- Post Grid -->
    <div class="post-grid">
      <article
        v-for="(post, index) in currentPosts"
        :key="post.url"
        class="post-card stagger-item"
        :class="{ 'post-card--sticky': post.sticky }"
      >
        <a :href="post.url" class="post-card-link">
          <!-- Card Header -->
          <div class="post-card-header">
            <span class="post-category" :class="`post-category--${post.categorySlug}`">
              {{ post.category }}
            </span>
            <span v-if="post.sticky" class="post-sticky-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 17v5"/>
                <path d="M9 11l-4 4h14l-4-4"/>
                <path d="M15 3.5L9.5 9 15 14.5"/>
                <path d="M9.5 3.5L15 9 9.5 14.5"/>
              </svg>
              置顶
            </span>
          </div>

          <!-- Card Body -->
          <h3 class="post-title">{{ post.title }}</h3>
          <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</p>

          <!-- Card Footer -->
          <div class="post-card-footer">
            <time class="post-date" :datetime="post.date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
              {{ formatDate(post.date) }}
            </time>
            <span class="post-read-more">
              阅读
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </span>
          </div>
        </a>
      </article>
    </div>

    <!-- Pagination -->
    <nav v-if="totalPages > 1" class="pagination" aria-label="分页导航">
      <button
        class="page-btn page-btn--nav"
        :disabled="currentPage <= 1"
        aria-label="上一页"
        @click="prevPage"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>

      <template v-for="p in visiblePages" :key="p">
        <span v-if="p === '...'" class="page-dots">···</span>
        <button
          v-else
          class="page-btn"
          :class="{ 'page-btn--active': p === currentPage }"
          :aria-current="p === currentPage ? 'page' : undefined"
          @click="goToPage(p as number)"
        >
          {{ p }}
        </button>
      </template>

      <button
        class="page-btn page-btn--nav"
        :disabled="currentPage >= totalPages"
        aria-label="下一页"
        @click="nextPage"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
    </nav>
  </div>
</template>

<style scoped>
.post-list {
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

/* ── Post Grid ── */
.post-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

/* ── Post Card ── */
.post-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  overflow: hidden;
}

.post-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.post-card--sticky {
  border-left: 3px solid var(--color-accent);
}

.post-card-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--space-5);
  color: inherit;
  text-decoration: none;
}

/* ── Card Header ── */
.post-card-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.post-category {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  font-weight: 500;
  border-radius: var(--radius-sm);
  background: var(--color-muted);
  color: var(--color-text-2);
  line-height: 1.4;
}

/* Category color variants */
.post-category--ai {
  background: rgba(139, 92, 246, 0.1);
  color: #8B5CF6;
}
.dark .post-category--ai {
  background: rgba(139, 92, 246, 0.15);
  color: #A78BFA;
}

.post-category--interview {
  background: rgba(245, 158, 11, 0.1);
  color: #D97706;
}
.dark .post-category--interview {
  background: rgba(245, 158, 11, 0.15);
  color: #FBBF24;
}

.post-category--notes {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}
.dark .post-category--notes {
  background: rgba(16, 185, 129, 0.15);
  color: #34D399;
}

.post-category--server {
  background: rgba(59, 130, 246, 0.1);
  color: #2563EB;
}
.dark .post-category--server {
  background: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
}

.post-sticky-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-accent);
  background: var(--color-accent-soft, rgba(37, 99, 235, 0.1));
  border-radius: var(--radius-sm);
}

/* ── Card Body ── */
.post-title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 var(--space-2);
  color: var(--color-text-1);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color var(--transition-fast);
}

.post-card:hover .post-title {
  color: var(--color-accent);
}

.post-excerpt {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-2);
  margin: 0 0 var(--space-4);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

/* ── Card Footer ── */
.post-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border-light);
}

.post-date {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  color: var(--color-text-3);
}

.post-read-more {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-accent);
  opacity: 0;
  transform: translateX(-4px);
  transition: all var(--transition-fast);
}

.post-card:hover .post-read-more {
  opacity: 1;
  transform: translateX(0);
}

/* ── Pagination ── */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-2);
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text-2);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.page-btn:hover:not(:disabled):not(.page-btn--active) {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.page-btn--active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-on-primary);
}

.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-btn--nav {
  border-color: transparent;
  background: transparent;
}

.page-btn--nav:hover:not(:disabled) {
  background: var(--color-muted);
}

.page-dots {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  font-size: var(--text-sm);
  color: var(--color-text-3);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .post-list {
    padding: var(--space-5) var(--space-4);
  }

  .post-card-link {
    padding: var(--space-4);
  }

  .post-title {
    font-size: var(--text-base);
  }

  .post-read-more {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
