<script setup lang="ts">
import { onMounted } from 'vue'
import { WxAuth } from 'wx-auth-sdk'
import 'wx-auth-sdk/dist/style.css'

onMounted(() => {
  // 本地开发环境跳过微信认证
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return

  // v1.2.6: apiBase、siteId 全自动，仅需设置非强制认证
  WxAuth.init({ required: false })
})
</script>

<template>
  <div id="wx-auth"></div>
</template>
