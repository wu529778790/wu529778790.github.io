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

            <!-- Social Links -->
            <div class="hero-links">
              <a
                href="https://github.com/wu529778790"
                target="_blank"
                rel="noopener"
                class="hero-social"
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </header>

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

/* ── Social Links ── */
.hero-links {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
}

.hero-social {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  color: var(--color-text-2);
  background: var(--color-muted);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.hero-social:hover {
  color: var(--color-accent);
  background: var(--color-accent-soft, rgba(37, 99, 235, 0.1));
  transform: translateY(-1px);
}

/* ── Responsive ── */
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
}
</style>
