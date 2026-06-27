import { computed } from 'vue'

export interface Post {
  title: string
  date: string
  categories: string[]
  tags: string[]
  url: string
  sticky?: number
}

export function useBlog() {
  const posts = computed(() => {
    if (typeof window === 'undefined') return []
    const data = (window as any).__BLOG_POSTS__ || []
    return data
      .sort((a: Post, b: Post) => {
        if (a.sticky && !b.sticky) return -1
        if (!a.sticky && b.sticky) return 1
        if (a.sticky && b.sticky) return b.sticky - a.sticky
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  })

  const allTags = computed(() => {
    const tagMap = new Map<string, number>()
    posts.value.forEach((post: Post) => {
      post.tags.forEach((tag: string) => {
        if (tag && tag.trim()) tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      })
    })
    return Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
  })

  const allCategories = computed(() => {
    const catMap = new Map<string, number>()
    posts.value.forEach((post: Post) => {
      post.categories.forEach((cat: string) => {
        catMap.set(cat, (catMap.get(cat) || 0) + 1)
      })
    })
    return Array.from(catMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
  })

  const postsByDate = computed(() => {
    const groups = new Map<string, Post[]>()
    posts.value.forEach((post: Post) => {
      const year = new Date(post.date).getFullYear().toString()
      if (!groups.has(year)) groups.set(year, [])
      groups.get(year)!.push(post)
    })
    return Array.from(groups.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  })

  return { posts, allTags, allCategories, postsByDate }
}
