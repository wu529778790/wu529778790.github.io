<script setup lang="ts">
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

function loadGiscus() {
  // Remove existing giscus iframe
  const existing = document.querySelector('.giscus, iframe.giscus-frame')
  if (existing) existing.remove()

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'wu529778790/wu529778790.github.io')
  script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkxNjU1NzY3NDM=')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDOCd6AJ84B-t54')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.crossOrigin = 'anonymous'
  script.async = true

  const container = document.getElementById('giscus-container')
  if (container) {
    container.appendChild(script)
  }
}

onMounted(() => {
  loadGiscus()
})

watch(() => route.path, () => {
  nextTick(() => {
    loadGiscus()
  })
})
</script>

<template>
  <div class="giscus-wrapper">
    <div class="giscus-divider">
      <svg class="giscus-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
      </svg>
      <span>评论区</span>
    </div>
    <div id="giscus-container"></div>
  </div>
</template>

<style scoped>
.giscus-wrapper {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

.giscus-divider {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-1);
}

.giscus-icon {
  color: var(--color-accent);
  flex-shrink: 0;
}

.giscus-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-border);
}
</style>
