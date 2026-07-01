import { ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

export interface HistoryItem {
  title: string
  url: string
  time: number
}

const STORAGE_KEY = 'blog-reading-history'
const MAX_ITEMS = 20

function loadHistory(): HistoryItem[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveHistory(items: HistoryItem[]) {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)))
  } catch {
    // storage full or unavailable
  }
}

export function useReadingHistory() {
  const route = useRoute()
  const { frontmatter, page } = useData()
  const history = ref<HistoryItem[]>(loadHistory())

  // Track current page on route change
  watch(
    () => route.path,
    () => {
      // Guard: skip during SSR or on homepage
      if (typeof document === 'undefined') return

      const title = frontmatter.value?.title || page.value?.title || document.title
      const url = route.path

      if (!title || url === '/' || url.endsWith('index.html')) return

      // Remove duplicate, add to front
      const filtered = history.value.filter(h => h.url !== url)
      filtered.unshift({ title, url, time: Date.now() })
      history.value = filtered.slice(0, MAX_ITEMS)
      saveHistory(history.value)
    },
    { immediate: true }
  )

  function clearHistory() {
    history.value = []
    saveHistory([])
  }

  return { history, clearHistory }
}
