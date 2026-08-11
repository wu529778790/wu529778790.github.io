<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

interface Heading {
  id: string
  text: string
  level: number
}

const headings = ref<Heading[]>([])
const activeId = ref('')
const route = useRoute()
let observer: IntersectionObserver | null = null

function extractHeadings() {
  // 扫描所有 .vp-doc 容器，合并去重：
  // - BlogLayout 默认 layout：.VPDoc > .content-container > .main > .vp-doc
  // - PasswordLayout：.pwd-page > .pwd-body > .vp-doc（锁定态还有 pwd-preview .vp-doc）
  const roots = document.querySelectorAll('.vp-doc')
  const found: Heading[] = []
  const seen = new Set<string>()
  for (const root of Array.from(roots)) {
    const hs = root.querySelectorAll<HTMLElement>('h2, h3')
    for (const h of Array.from(hs)) {
      if (!h.id || seen.has(h.id)) continue
      seen.add(h.id)
      found.push({
        id: h.id,
        text: (h.textContent || '').trim(),
        level: parseInt(h.tagName.substring(1), 10),
      })
    }
  }
  headings.value = found
}

function setupObserver() {
  observer?.disconnect()
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
  observer = new IntersectionObserver(
    (entries) => {
      // 取首个进入视口的 heading（向上滚动时上面那个 heading 会再次 intersect）
      for (const entry of entries) {
        if (entry.isIntersecting) activeId.value = entry.target.id
      }
    },
    { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
  )
  headings.value.forEach((h) => {
    const el = document.getElementById(h.id)
    if (el) observer!.observe(el)
  })
}

function refresh() {
  // 多等一拍：Content 组件 mounted 后 .vp-doc 才出现在 DOM
  setTimeout(() => {
    extractHeadings()
    setupObserver()
  }, 80)
}

onMounted(async () => {
  await nextTick()
  refresh()
})

watch(
  () => route.path,
  () => {
    headings.value = []
    activeId.value = ''
    refresh()
  }
)

onUnmounted(() => observer?.disconnect())

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <aside v-if="headings.length >= 2" class="page-outline">
    <div class="page-outline-title">本页目录</div>
    <nav class="page-outline-nav">
      <a
        v-for="h in headings"
        :key="h.id"
        :href="`#${h.id}`"
        class="page-outline-item"
        :class="{
          'page-outline-item--active': activeId === h.id,
          'page-outline-item--h3': h.level === 3,
        }"
        @click.prevent="scrollTo(h.id)"
      >
        {{ h.text }}
      </a>
    </nav>
  </aside>
</template>

<style scoped>
.page-outline {
  width: 220px;
  flex-shrink: 0;
  padding-left: var(--space-4, 16px);
  border-left: 1px solid var(--color-border-light, #e5e7eb);
}

.page-outline-title {
  font-family: var(--font-heading);
  font-size: var(--text-xs, 12px);
  font-weight: 700;
  color: var(--color-text-3, #6b7280);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-3, 12px);
}

.page-outline-nav {
  position: sticky;
  top: calc(var(--vp-nav-height, 56px) + 32px);
  max-height: calc(100vh - var(--vp-nav-height, 56px) - 64px);
  overflow-y: auto;
  /* 隐藏滚动条但保留滚动行为 */
  scrollbar-width: thin;
}

.page-outline-item {
  display: block;
  padding: 6px 0 6px var(--space-3, 12px);
  margin-left: -1px;
  border-left: 2px solid transparent;
  color: var(--color-text-2, #374151);
  text-decoration: none;
  font-size: var(--text-sm, 13px);
  line-height: 1.5;
  transition: color 0.2s, border-color 0.2s;
  /* 长标题截断 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-outline-item:hover {
  color: var(--color-accent, #2563eb);
}

.page-outline-item--active {
  color: var(--color-accent, #2563eb);
  border-left-color: var(--color-accent, #2563eb);
  font-weight: 500;
}

.page-outline-item--h3 {
  padding-left: calc(var(--space-3, 12px) + var(--space-3, 12px));
  font-size: var(--text-xs, 12px);
  color: var(--color-text-3, #6b7280);
}

.page-outline-item--h3.page-outline-item--active {
  color: var(--color-accent, #2563eb);
}

/* 移动端：不渲染（MobileToc 接管） */
@media (max-width: 1024px) {
  .page-outline {
    display: none;
  }
}
</style>
