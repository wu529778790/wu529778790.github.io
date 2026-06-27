<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import PostList from '../components/PostList.vue'
import GiscusComment from '../components/GiscusComment.vue'

const { Layout } = DefaultTheme
const route = useRoute()
const isHome = () => route.path === '/' || route.path === '/index.html' || route.path === '/index'
</script>

<template>
  <Layout>
    <template v-if="isHome()" #page-top>
      <div class="blog-home">
        <!-- Hero Section -->
        <header class="hero">
          <div class="hero-content">
            <h1 class="hero-title">神族九帝</h1>
            <p class="hero-desc">前端技术博客 — 面试题 · 学习笔记 · AI 探索</p>
            <div class="hero-links">
              <a
                href="https://github.com/wu529778790"
                target="_blank"
                rel="noopener"
                class="hero-social"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
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
  padding: var(--space-16) var(--space-6) var(--space-10);
  text-align: center;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.hero-content {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
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

.hero-links {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
}

.hero-social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  color: var(--color-text-2);
  background: var(--color-muted);
  transition: all var(--transition-fast);
}

.hero-social:hover {
  color: var(--color-accent);
  background: var(--color-accent-soft, rgba(37, 99, 235, 0.1));
  transform: translateY(-1px);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .hero {
    padding: var(--space-10) var(--space-4) var(--space-8);
  }

  .hero-title {
    font-size: var(--text-3xl);
  }

  .hero-desc {
    font-size: var(--text-base);
  }
}
</style>
