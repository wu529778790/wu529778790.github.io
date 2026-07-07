import { posts, type Post } from '../data/posts'

// Category mapping from directory names to display names (fallback)
const categoryMap: Record<string, string> = {
  '09.AI': 'AI 探索',
  '10.面试题': '面试题',
  '20.笔记': '学习笔记',
  '31.服务器': '服务器',
}

// Extract category: prefer front matter categories (last item = most specific), fallback to URL dir
function extractCategory(post: Post): string {
  if (post.categories && post.categories.length > 0) {
    // Use the last (most specific) category from front matter
    return post.categories[post.categories.length - 1]
  }
  const match = post.url.match(/^\/([^/]+)\//)
  if (match) {
    const dir = match[1]
    return categoryMap[dir] || dir.replace(/^\d+[\.\-]\s*/, '')
  }
  return '未分类'
}

// Extract category slug for styling
function extractCategorySlug(post: Post): string {
  const match = post.url.match(/^\/([^/]+)\//)
  if (match) {
    return match[1].replace(/^\d+[\.\-]\s*/, '').toLowerCase()
  }
  return 'uncategorized'
}

export interface EnrichedPost extends Post {
  category: string
  categorySlug: string
}

export function useBlog() {
  const enrichedPosts: EnrichedPost[] = posts.map((post) => ({
    ...post,
    category: extractCategory(post),
    categorySlug: extractCategorySlug(post),
  }))

  return { posts: enrichedPosts }
}
