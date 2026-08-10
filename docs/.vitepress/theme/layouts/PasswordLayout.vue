<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const input = ref('')
const error = ref(false)
const unlocked = ref(false)
const storageKey = () => 'blog-unlock:' + route.path // key 带路径：一篇解锁不影响其他篇

// 挂载后再读 sessionStorage：SSR 阶段固定渲染密码界面，避免 hydration 不一致
onMounted(() => {
  unlocked.value = sessionStorage.getItem(storageKey()) === '1'
})

// 路由切换时重置状态
watch(
  () => route.path,
  () => {
    input.value = ''
    error.value = false
    unlocked.value =
      typeof window !== 'undefined' && sessionStorage.getItem(storageKey()) === '1'
  }
)

function unlock() {
  if (input.value === frontmatter.value.password) {
    sessionStorage.setItem(storageKey(), '1')
    unlocked.value = true
  } else {
    error.value = true
  }
}
</script>

<template>
  <div class="pwd-page">
    <!-- 未解锁：只渲染密码卡片，正文不进入 DOM（静态 HTML 中也无正文） -->
    <template v-if="frontmatter.password && !unlocked">
      <div class="pwd-card">
        <svg
          class="pwd-icon"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <h1 class="pwd-title">{{ frontmatter.title }}</h1>
        <p class="pwd-hint">此内容受密码保护，请输入访问密码</p>
        <input
          v-model="input"
          type="password"
          class="pwd-input"
          :class="{ 'pwd-input--error': error }"
          placeholder="输入密码"
          autofocus
          @keyup.enter="unlock"
        />
        <p v-if="error" class="pwd-error">密码错误，请重试</p>
        <button class="pwd-btn" @click="unlock">解锁</button>
      </div>
    </template>

    <!-- 已解锁：显示标题与正文 -->
    <template v-else>
      <div class="article-header">
        <h1 class="article-title">{{ frontmatter.title }}</h1>
        <div v-if="frontmatter.date" class="article-meta">
          <time :datetime="frontmatter.date">{{ frontmatter.date.slice(0, 10) }}</time>
        </div>
      </div>
      <Content />
    </template>
  </div>
</template>

<style scoped>
.pwd-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-5);
}
.pwd-card {
  max-width: 360px;
  margin: 64px auto;
  padding: 40px 32px;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--radius-lg, 12px);
  text-align: center;
  background: var(--color-surface, #fff);
}
.pwd-icon {
  color: var(--color-accent, #2563eb);
  margin-bottom: 12px;
}
.pwd-title {
  font-family: var(--font-heading);
  font-size: var(--text-lg, 17px);
  font-weight: 500;
  color: var(--color-text-1, #1f2328);
  margin: 0 0 4px;
}
.pwd-hint {
  font-size: 13px;
  color: var(--color-text-3, #6b7280);
  margin: 0 0 20px;
}
.pwd-input {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: var(--color-background-primary, #fff);
  color: var(--color-text-1, #1f2328);
}
.pwd-input:focus {
  outline: none;
  border-color: var(--color-accent, #2563eb);
}
.pwd-input--error {
  border-color: #dc2626;
}
.pwd-error {
  color: #dc2626;
  font-size: 12px;
  margin: 8px 0 0;
}
.pwd-btn {
  margin-top: 16px;
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 8px;
  background: var(--color-accent, #2563eb);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.pwd-btn:hover {
  opacity: 0.9;
}
</style>
