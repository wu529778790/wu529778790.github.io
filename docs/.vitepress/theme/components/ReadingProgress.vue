<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)
const showTop = ref(false)

function updateProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
  showTop.value = scrollTop > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <!-- Reading Progress Bar -->
  <div class="reading-progress" :style="{ width: progress + '%' }"></div>
  <!-- Back to Top Button -->
  <button
    class="back-to-top"
    :class="{ 'back-to-top--visible': showTop }"
    @click="scrollToTop"
    aria-label="返回顶部"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m18 15-6-6-6 6"/>
    </svg>
  </button>
</template>

<style scoped>
/* ── Reading Progress Bar ── */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-hover));
  z-index: 9999;
  transition: width 0.1s linear;
  pointer-events: none;
}

/* ── Back to Top ── */
.back-to-top {
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--color-text-2);
  cursor: pointer;
  opacity: 0;
  transform: translateY(12px);
  transition: all var(--transition-base);
  box-shadow: var(--shadow-lg);
  z-index: 100;
}

.back-to-top--visible {
  opacity: 1;
  transform: translateY(0);
}

.back-to-top:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
  }
}
</style>
