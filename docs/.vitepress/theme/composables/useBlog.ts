import { computed } from 'vue'
import { posts } from '../posts.data'

export function useBlog() {
  const allTags = computed(() => {
    const tagMap = new Map<string, number>()
    posts.forEach(p => p.tags.forEach(t => tagMap.set(t, (tagMap.get(t) || 0) + 1)))
    return Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
  })

  const allCategories = computed(() => {
    const catMap = new Map<string, number>()
    posts.forEach(p => p.categories.forEach(c => catMap.set(c, (catMap.get(c) || 0) + 1)))
    return Array.from(catMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
  })

  const postsByDate = computed(() => {
    const groups = new Map<string, typeof posts[0][]>()
    posts.forEach(p => {
      const year = new Date(p.date).getFullYear().toString()
      if (!groups.has(year)) groups.set(year, [])
      groups.get(year)!.push(p)
    })
    return Array.from(groups.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  })

  return { posts, allTags, allCategories, postsByDate }
}
