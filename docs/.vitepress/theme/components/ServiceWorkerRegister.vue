<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch(() => {
          // SW registration failed silently
        })
    })
  }
})
</script>

<template>
  <!-- Service Worker Registration (no visual output) -->
</template>
