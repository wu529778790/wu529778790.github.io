<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const input = ref('')
const error = ref(false)
const unlocked = ref(false)
const storageKey = () => 'blog-unlock:' + route.path // key 带路径：一篇解锁不影响其他篇

// 本地记住解锁状态：存的是密码本身，改密码后旧记录自动失效
const isUnlocked = () =>
  typeof window !== 'undefined' &&
  localStorage.getItem(storageKey()) === frontmatter.value.password

// 挂载后再读 localStorage：SSR 阶段固定渲染锁定态，避免 hydration 不一致
onMounted(() => {
  unlocked.value = isUnlocked()
})

// 路由切换时重置状态
watch(
  () => route.path,
  () => {
    input.value = ''
    error.value = false
    unlocked.value = isUnlocked()
  }
)

function unlock() {
  if (input.value === frontmatter.value.password) {
    localStorage.setItem(storageKey(), frontmatter.value.password)
    unlocked.value = true
  } else {
    error.value = true
  }
}
</script>

<template>
  <div class="pwd-page">
    <div class="article-header">
      <h1 class="article-title">{{ frontmatter.title }}</h1>
      <div v-if="frontmatter.date" class="article-meta">
        <time :datetime="frontmatter.date">{{ frontmatter.date.slice(0, 10) }}</time>
      </div>
    </div>

    <!-- 未解锁：只展示正文前几段（预览）+ 密码解锁区 -->
    <div v-if="frontmatter.password && !unlocked" class="pwd-locked">
      <div class="pwd-preview-wrap">
        <div class="pwd-preview vp-doc">
          <Content />
        </div>
        <div class="pwd-fade"></div>
      </div>

      <div class="pwd-gate">
        <svg
          class="pwd-icon"
          width="22"
          height="22"
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
        <p class="pwd-hint">预览到此为止，输入密码解锁全文</p>
        <div class="pwd-row">
          <input
            v-model="input"
            type="password"
            class="pwd-input"
            :class="{ 'pwd-input--error': error }"
            placeholder="输入密码"
            autofocus
            @keyup.enter="unlock"
          />
          <button class="pwd-btn" @click="unlock">解锁</button>
        </div>
        <p v-if="error" class="pwd-error">密码错误，请重试</p>
        <p class="pwd-remember-hint">解锁后本机会记住，下次进入无需重复输入</p>
      </div>
    </div>

    <!-- 已解锁：完整正文 -->
    <template v-else>
      <div class="vp-doc">
        <Content />
      </div>
    </template>
  </div>
</template>

<style scoped>
.pwd-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-5);
}
.article-header {
  padding: 0;
  margin-top: var(--space-4);
}
.article-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: var(--color-text-1, #1f2328);
  margin: 0 0 var(--space-3, 12px);
}
.article-meta {
  display: flex;
  align-items: center;
  gap: var(--space-1, 4px);
  font-size: var(--text-sm, 13px);
  color: var(--color-text-3, #6b7280);
  padding-bottom: var(--space-4, 16px);
  margin-bottom: var(--space-4, 16px);
  border-bottom: 1px solid var(--color-border-light, #e5e7eb);
}

/* ── 锁定态：预览裁剪 + 渐变遮罩 ── */
.pwd-preview-wrap {
  position: relative;
}
.pwd-preview {
  max-height: 320px; /* 预览高度，约 8-10 行正文，可自行调整 */
  overflow: hidden;
}
.pwd-fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100px;
  background: linear-gradient(180deg, transparent, var(--color-background-primary, #fff));
  pointer-events: none;
}

/* ── 解锁区 ── */
.pwd-gate {
  margin-top: 12px;
  padding: 24px;
  border: 1px dashed var(--color-border, #d1d5db);
  border-radius: var(--radius-lg, 12px);
  text-align: center;
  background: var(--color-surface, #fff);
}
.pwd-icon {
  color: var(--color-accent, #2563eb);
  vertical-align: -4px;
  margin-right: 6px;
}
.pwd-hint {
  display: inline-block;
  font-size: 13px;
  color: var(--color-text-3, #6b7280);
  margin: 0 0 14px;
}
.pwd-row {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.pwd-input {
  width: 220px;
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
.pwd-btn {
  padding: 9px 20px;
  border: none;
  border-radius: 8px;
  background: var(--color-accent, #2563eb);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}
.pwd-btn:hover {
  opacity: 0.9;
}
.pwd-error {
  color: #dc2626;
  font-size: 12px;
  margin: 10px 0 0;
}
.pwd-remember-hint {
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--color-text-3, #6b7280);
}

@media (max-width: 480px) {
  .pwd-row {
    flex-direction: column;
    align-items: stretch;
  }
  .pwd-input {
    width: 100%;
  }
}
</style>
