<script setup lang="ts">
import { onMounted } from 'vue'
import { WxAuth } from 'wx-auth-sdk'
import 'wx-auth-sdk/dist/style.css'

onMounted(() => {
  WxAuth.init({
    onVerified: (user) => {
      console.log('认证成功', user)
    },
  })
})
</script>

<template>
  <div id="wx-auth"></div>
</template>
