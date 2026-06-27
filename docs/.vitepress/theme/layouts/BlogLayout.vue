<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { useBlog } from '../composables/useBlog'
import PostList from '../components/PostList.vue'
import GiscusComment from '../components/GiscusComment.vue'

const { Layout } = DefaultTheme
const route = useRoute()
const { posts } = useBlog()
const isHome = () => route.path === '/' || route.path === '/index.html' || route.path === '/index'

// 统计数据
const totalPosts = posts.length
const categories = [...new Set(posts.map(p => p.category))]
const totalCategories = categories.length

// 社交链接
const socialLinks = [
  { name: 'Telegram', url: 'https://t.me/shenzjd_com', icon: 'telegram' },
  { name: 'GitHub', url: 'https://github.com/wu529778790', icon: 'github' },
  { name: 'X', url: 'https://x.com/shenzujiudi', icon: 'x' },
]

// 导航网站
const navSites = [
  { name: '首页', url: 'https://shenzjd.com', desc: '个人主页', icon: 'home' },
  { name: '在线网盘', url: 'https://alist.shenzjd.com', desc: '文件存储与分享', icon: 'folder' },
  { name: '网盘搜索', url: 'https://panhub.shenzjd.com', desc: '资源搜索利器', icon: 'search' },
  { name: '快链', url: 'https://duanlian.shenzjd.com', desc: '短链接服务', icon: 'link' },
  { name: '视频解析', url: 'https://parse.shenzjd.com', desc: '在线视频解析', icon: 'video' },
  { name: '热点聚合', url: 'https://newshub.shenzjd.com', desc: '新闻资讯聚合', icon: 'rss' },
  { name: '个人导航', url: 'https://navhub.shenzjd.com', desc: '常用网站导航', icon: 'compass' },
  { name: '必应壁纸', url: 'https://bing.shenzjd.com', desc: '每日高清壁纸', icon: 'image' },
]
</script>

<template>
  <Layout>
    <template v-if="isHome()" #page-top>
      <div class="blog-home">
        <!-- Left: Post List -->
        <main class="blog-main">
          <PostList />
        </main>

        <!-- Right: Sidebar -->
        <aside class="blog-sidebar">
          <div class="sidebar-inner">
            <!-- Author Card -->
            <div class="sidebar-card sidebar-author">
              <h1 class="sidebar-title">神族九帝</h1>
              <p class="sidebar-desc">前端技术博客 — 面试题 · 学习笔记 · AI 探索</p>

              <!-- Stats -->
              <div class="sidebar-stats">
                <div class="sidebar-stat">
                  <span class="sidebar-stat-num">{{ totalPosts }}</span>
                  <span class="sidebar-stat-label">篇文章</span>
                </div>
                <div class="sidebar-stat">
                  <span class="sidebar-stat-num">{{ totalCategories }}</span>
                  <span class="sidebar-stat-label">个分类</span>
                </div>
                <div class="sidebar-stat">
                  <span class="sidebar-stat-num">2015</span>
                  <span class="sidebar-stat-label">年开始</span>
                </div>
              </div>

              <!-- Social Icons -->
              <div class="sidebar-social">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  rel="noopener"
                  class="sidebar-social-icon"
                  :aria-label="social.name"
                >
                  <svg v-if="social.icon === 'telegram'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <svg v-else-if="social.icon === 'github'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <svg v-else-if="social.icon === 'x'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Nav Sites Card -->
            <div class="sidebar-card sidebar-nav">
              <div class="sidebar-nav-list">
                <a
                  v-for="site in navSites"
                  :key="site.name"
                  :href="site.url"
                  target="_blank"
                  rel="noopener"
                  class="sidebar-nav-item"
                >
                  <!-- Home -->
                  <svg v-if="site.icon === 'home'" class="sidebar-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  <!-- Folder -->
                  <svg v-else-if="site.icon === 'folder'" class="sidebar-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
                  </svg>
                  <!-- Search -->
                  <svg v-else-if="site.icon === 'search'" class="sidebar-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                  </svg>
                  <!-- Link -->
                  <svg v-else-if="site.icon === 'link'" class="sidebar-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                  <!-- Video -->
                  <svg v-else-if="site.icon === 'video'" class="sidebar-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/>
                    <rect x="2" y="6" width="14" height="12" rx="2"/>
                  </svg>
                  <!-- RSS -->
                  <svg v-else-if="site.icon === 'rss'" class="sidebar-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 11a9 9 0 0 1 9 9"/>
                    <path d="M4 4a16 16 0 0 1 16 16"/>
                    <circle cx="5" cy="19" r="1"/>
                  </svg>
                  <!-- Compass -->
                  <svg v-else-if="site.icon === 'compass'" class="sidebar-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                  </svg>
                  <!-- Image -->
                  <svg v-else-if="site.icon === 'image'" class="sidebar-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                    <circle cx="9" cy="9" r="2"/>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                  </svg>
                  <span class="sidebar-nav-name">{{ site.name }}</span>
                  <svg class="sidebar-nav-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </template>

    <template #doc-footer-before>
      <GiscusComment v-if="!isHome()" />
    </template>
  </Layout>
</template>

<style scoped>
.blog-home {
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
  min-height: 100vh;
}

/* ── Left: Main Content ── */
.blog-main {
  flex: 1;
  min-width: 0;
  border-right: 1px solid var(--color-border);
}

/* ── Right: Sidebar ── */
.blog-sidebar {
  width: 300px;
  flex-shrink: 0;
}

.sidebar-inner {
  padding: var(--space-6);
}

/* ── Sidebar Card ── */
.sidebar-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  margin-bottom: var(--space-4);
}

/* ── Author Card ── */
.sidebar-author {
  text-align: center;
}

.sidebar-title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-1);
  margin: 0 0 var(--space-2);
  letter-spacing: -0.02em;
}

.sidebar-desc {
  font-size: var(--text-sm);
  color: var(--color-text-2);
  margin: 0 0 var(--space-4);
  line-height: 1.5;
}

.sidebar-stats {
  display: flex;
  justify-content: center;
  gap: var(--space-5);
  margin-bottom: var(--space-4);
}

.sidebar-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.sidebar-stat-num {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
}

.sidebar-stat-label {
  font-size: var(--text-xs);
  color: var(--color-text-3);
}

.sidebar-social {
  display: flex;
  justify-content: center;
  gap: var(--space-2);
}

.sidebar-social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  color: var(--color-text-2);
  background: var(--color-muted);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.sidebar-social-icon:hover {
  color: var(--color-accent);
  background: var(--color-accent-soft, rgba(37, 99, 235, 0.1));
  transform: translateY(-1px);
}

/* ── Nav Card ── */
.sidebar-nav {
  padding: var(--space-4);
}

.sidebar-nav-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-2);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.sidebar-nav-item:hover {
  background: var(--color-muted);
}

.sidebar-nav-icon {
  color: var(--color-accent);
  flex-shrink: 0;
}

.sidebar-nav-name {
  font-size: var(--text-sm);
  color: var(--color-text-1);
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-nav-arrow {
  color: var(--color-text-3);
  flex-shrink: 0;
  opacity: 0;
  transition: all var(--transition-fast);
}

.sidebar-nav-item:hover .sidebar-nav-arrow {
  opacity: 1;
  transform: translateX(2px);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .blog-home {
    flex-direction: column;
  }

  .blog-main {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }

  .blog-sidebar {
    width: 100%;
  }

  .sidebar-inner {
    padding: var(--space-4);
  }

  .sidebar-nav-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .sidebar-nav-list {
    grid-template-columns: 1fr;
  }
}
</style>
