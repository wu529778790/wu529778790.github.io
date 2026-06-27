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
        <!-- Hero Section -->
        <header class="hero">
          <div class="hero-bg"></div>
          <div class="hero-content">
            <h1 class="hero-title">神族九帝</h1>
            <p class="hero-desc">前端技术博客 — 面试题 · 学习笔记 · AI 探索</p>

            <!-- Stats -->
            <div class="hero-stats">
              <div class="hero-stat">
                <span class="hero-stat-num">{{ totalPosts }}</span>
                <span class="hero-stat-label">篇文章</span>
              </div>
              <div class="hero-stat-divider"></div>
              <div class="hero-stat">
                <span class="hero-stat-num">{{ totalCategories }}</span>
                <span class="hero-stat-label">个分类</span>
              </div>
              <div class="hero-stat-divider"></div>
              <div class="hero-stat">
                <span class="hero-stat-num">2015</span>
                <span class="hero-stat-label">年开始</span>
              </div>
            </div>

            <!-- Social Icons -->
            <div class="hero-social-row">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener"
                class="hero-social-icon"
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
        </header>

        <!-- Nav Sites Section -->
        <section class="nav-sites">
          <h2 class="nav-sites-title">我的网站</h2>
          <div class="nav-sites-grid">
            <a
              v-for="site in navSites"
              :key="site.name"
              :href="site.url"
              target="_blank"
              rel="noopener"
              class="nav-site-card"
            >
              <!-- Folder -->
              <svg v-if="site.icon === 'folder'" class="nav-site-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
              </svg>
              <!-- Search -->
              <svg v-else-if="site.icon === 'search'" class="nav-site-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
              <!-- Link -->
              <svg v-else-if="site.icon === 'link'" class="nav-site-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              <!-- Video -->
              <svg v-else-if="site.icon === 'video'" class="nav-site-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/>
                <rect x="2" y="6" width="14" height="12" rx="2"/>
              </svg>
              <!-- RSS -->
              <svg v-else-if="site.icon === 'rss'" class="nav-site-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 11a9 9 0 0 1 9 9"/>
                <path d="M4 4a16 16 0 0 1 16 16"/>
                <circle cx="5" cy="19" r="1"/>
              </svg>
              <!-- Compass -->
              <svg v-else-if="site.icon === 'compass'" class="nav-site-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
              </svg>
              <!-- Image -->
              <svg v-else-if="site.icon === 'image'" class="nav-site-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
              <div class="nav-site-info">
                <span class="nav-site-name">{{ site.name }}</span>
                <span class="nav-site-desc">{{ site.desc }}</span>
              </div>
              <svg class="nav-site-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </div>
        </section>

        <!-- Post List -->
        <PostList />
      </div>
    </template>

    <template #doc-footer-before>
      <GiscusComment v-if="!isHome()" />
    </template>
  </Layout>
</template>

<style scoped>
.blog-home {
  min-height: 100vh;
}

/* ── Hero ── */
.hero {
  position: relative;
  padding: var(--space-20) var(--space-6) var(--space-12);
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37, 99, 235, 0.12), transparent),
    radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139, 92, 246, 0.08), transparent),
    var(--color-surface);
  z-index: -1;
}

.dark .hero-bg {
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(96, 165, 250, 0.15), transparent),
    radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139, 92, 246, 0.1), transparent),
    var(--color-surface);
}

.hero-content {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 2.75rem;
  font-weight: 700;
  color: var(--color-text-1);
  margin: 0 0 var(--space-3);
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.hero-desc {
  font-size: var(--text-lg);
  color: var(--color-text-2);
  margin: 0 0 var(--space-6);
  line-height: 1.6;
}

/* ── Stats ── */
.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}

.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
}

.hero-stat-num {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
}

.hero-stat-label {
  font-size: var(--text-sm);
  color: var(--color-text-3);
}

.hero-stat-divider {
  width: 1px;
  height: 32px;
  background: var(--color-border);
}

/* ── Social Icons ── */
.hero-social-row {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
}

.hero-social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  color: var(--color-text-2);
  background: var(--color-muted);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.hero-social-icon:hover {
  color: var(--color-accent);
  background: var(--color-accent-soft, rgba(37, 99, 235, 0.1));
  transform: translateY(-2px);
}

/* ── Nav Sites ── */
.nav-sites {
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 0 var(--space-6) var(--space-8);
}

.nav-sites-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text-1);
  margin: 0 0 var(--space-5);
  text-align: center;
}

.nav-sites-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
}

.nav-site-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: all var(--transition-base);
}

.nav-site-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.nav-site-icon {
  color: var(--color-accent);
  flex-shrink: 0;
}

.nav-site-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  flex: 1;
  min-width: 0;
}

.nav-site-name {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-1);
  line-height: 1.3;
}

.nav-site-desc {
  font-size: var(--text-xs);
  color: var(--color-text-3);
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.nav-site-arrow {
  color: var(--color-text-3);
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.nav-site-card:hover .nav-site-arrow {
  color: var(--color-accent);
  transform: translateX(2px);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .nav-sites-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: var(--space-12) var(--space-4) var(--space-8);
  }

  .hero-title {
    font-size: var(--text-3xl);
  }

  .hero-desc {
    font-size: var(--text-base);
  }

  .hero-stats {
    gap: var(--space-4);
  }

  .hero-stat-num {
    font-size: var(--text-xl);
  }

  .nav-sites {
    padding: 0 var(--space-4) var(--space-6);
  }

  .nav-sites-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .nav-sites-grid {
    grid-template-columns: 1fr;
  }
}
</style>
