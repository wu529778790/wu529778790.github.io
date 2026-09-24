<script setup lang="ts">
import { onMounted } from 'vue'

// wx-auth-sdk 改为 CDN 运行时加载（2026-09-24，≥1.2.44 公众号验证码登录版）：
// - 不再走 npm 依赖：SDK 发 1.2.x 新版自动生效，本仓库无需升级包
// - 版本下限锁定：unpkg 支持 @^1.2.44（≥1.2.44 的最新 1.x），jsdelivr 用 @1（最新 1.x），
//   major breaking 不会静默上线
// - CDN 容灾（与 panhub wxAuthSdkCdn 同一策略）：unpkg 主、jsdelivr 备，
//   单个失败/超时（6s，防 TCP 黑洞场景 onerror 不触发）自动切下一个
// - UMD 全局导出 window.WxAuth，弹窗样式由 UMD 内联注入，无需单独引 CSS
const SDK_URLS = [
  'https://unpkg.com/wx-auth-sdk@^1.2.44/dist/wx-auth.umd.js',
  'https://cdn.jsdelivr.net/npm/wx-auth-sdk@1/dist/wx-auth.umd.js',
]
const PER_ATTEMPT_TIMEOUT_MS = 6000

function loadSdk(i = 0): Promise<any> {
  if ((window as any).WxAuth) return Promise.resolve((window as any).WxAuth)
  return new Promise((resolve, reject) => {
    if (i >= SDK_URLS.length) {
      return reject(new Error(`wx-auth-sdk 所有 CDN 均加载失败: ${SDK_URLS.join(', ')}`))
    }
    const el = document.createElement('script')
    el.src = SDK_URLS[i]
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      el.remove()
      if ((window as any).WxAuth) return resolve((window as any).WxAuth)
      loadSdk(i + 1).then(resolve, reject)
    }
    const timer = setTimeout(finish, PER_ATTEMPT_TIMEOUT_MS)
    el.onload = finish
    el.onerror = finish
    document.head.appendChild(el)
  })
}

onMounted(() => {
  // 本地开发环境跳过微信认证
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return

  loadSdk()
    .then((WxAuth) => {
      // apiBase、siteId 全自动；非强制认证（样式由 UMD 内联注入）
      WxAuth.init({ required: false })
    })
    .catch((e) => {
      console.error('[wx-auth] SDK 加载失败，登录不可用，页面其余功能不受影响', e)
    })
})
</script>

<template>
  <div id="wx-auth"></div>
</template>
