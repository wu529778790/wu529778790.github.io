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
      <span>💬 评论区</span>
    </div>
    <div id="giscus-container"></div>
  </div>
</template>

<style scoped>
.giscus-wrapper {
  max-width: 740px;
  margin: 0 auto;
  padding: 32px 24px;
}
.giscus-divider {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 12px;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.giscus-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--vp-c-divider);
}
</style>
