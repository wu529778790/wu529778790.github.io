<script setup lang="ts">
import { onMounted } from 'vue'
import { WxAuth } from 'wx-auth-sdk'
import 'wx-auth-sdk/dist/style.css'

onMounted(() => {
  WxAuth.init({
    apiBase: 'https://wx-auth.shenzjd.com',
    siteId: 'blog.shenzjd.com',
    onVerified: (user: any) => {
      console.log('认证成功', user)
    },
  })
})
</script>

<template>
  <div id="wx-auth"></div>
</template>
