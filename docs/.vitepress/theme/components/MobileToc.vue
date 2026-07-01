<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()
const headings = ref<{ id: string; text: string; level: number }[]>([])
const activeId = ref('')
const isOpen = ref(false)

function extractHeadings() {
  const doc = document.querySelector('.vp-doc .content-container .main')
  if (!doc) return
  const h2h3 = doc.querySelectorAll('h2, h3')
  headings.value = Array.from(h2h3).map(h => ({
    id: h.id,
    text: h.textContent?.trim() || '',
    level: parseInt(h.tagName[1]),
  }))
}

function observeActive() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
  )
  headings.value.forEach(h => {
    const el = document.getElementById(h.id)
    if (el) observer.observe(el)
  })
  return observer
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  // Guard: skip during SSR
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  // Only show on mobile
  if (window.innerWidth >= 960) return
  extractHeadings()
  if (headings.value.length >= 3) {
    observer = observeActive()
  } else {
    headings.value = []
  }
})

onUnmounted(() => {
  observer?.disconnect()
})

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    isOpen.value = false
  }
}
</script>

<template>
  <div v-if="headings.length >= 3" class="mobile-toc">
    <!-- Toggle Button -->
    <button
      class="mobile-toc-btn"
      :class="{ 'mobile-toc-btn--active': isOpen }"
      @click="isOpen = !isOpen"
      aria-label="文章目录"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" x2="21" y1="6" y2="6"/>
        <line x1="3" x2="21" y1="12" y2="12"/>
        <line x1="3" x2="21" y1="18" y2="18"/>
      </svg>
    </button>

    <!-- TOC Panel -->
    <Transition name="toc-slide">
      <div v-if="isOpen" class="mobile-toc-panel">
        <div class="mobile-toc-title">目录</div>
        <nav class="mobile-toc-nav">
          <a
            v-for="h in headings"
            :key="h.id"
            :href="`#${h.id}`"
            class="mobile-toc-item"
            :class="{
              'mobile-toc-item--active': activeId === h.id,
              'mobile-toc-item--h3': h.level === 3,
            }"
            @click.prevent="scrollTo(h.id)"
          >
            {{ h.text }}
          </a>
        </nav>
      </div>
    </Transition>

    <!-- Overlay -->
    <div v-if="isOpen" class="mobile-toc-overlay" @click="isOpen = false"></div>
  </div>
</template>

<style scoped>
.mobile-toc {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 200;
}

.mobile-toc-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--color-text-2);
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-base);
}

.mobile-toc-btn--active {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.mobile-toc-panel {
  position: absolute;
  bottom: 56px;
  right: 0;
  width: min(280px, calc(100vw - 40px));
  max-height: 60vh;
  overflow-y: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: var(--space-3);
}

.mobile-toc-title {
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--space-2);
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: var(--space-1);
}

.mobile-toc-nav {
  display: flex;
  flex-direction: column;
}

.mobile-toc-item {
  padding: var(--space-2) var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-2);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-toc-item:hover {
  background: var(--color-muted);
}

.mobile-toc-item--active {
  color: var(--color-accent);
  background: var(--color-accent-soft, rgba(37, 99, 235, 0.08));
}

.mobile-toc-item--h3 {
  padding-left: var(--space-4);
  font-size: var(--text-xs);
}

.mobile-toc-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: -1;
}

/* Transition */
.toc-slide-enter-active,
.toc-slide-leave-active {
  transition: all var(--transition-base);
}

.toc-slide-enter-from,
.toc-slide-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}

@media (min-width: 960px) {
  .mobile-toc {
    display: none;
  }
}
</style>
