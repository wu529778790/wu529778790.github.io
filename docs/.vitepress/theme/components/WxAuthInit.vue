<script setup lang="ts">
import { onMounted } from 'vue'
import { WxAuth } from 'wx-auth-sdk'
import 'wx-auth-sdk/dist/style.css'

onMounted(() => {
  WxAuth.init({
    // 开发环境设置为可选认证，避免强制弹窗
    required: false,
    siteId: 'localhost',
    onVerified: (user) => {
      console.log('认证成功', user)
    },
    onClose: () => {
      console.log('用户关闭了认证弹窗')
    },
    onError: (error) => {
      console.error('[WxAuth] 认证错误:', error)
    }
  })
})
</script>

<template>
  <div id="wx-auth"></div>
</template>
