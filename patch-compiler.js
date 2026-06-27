/**
 * Postinstall script: fixes dependency compatibility issues.
 *
 * 1. vitepress-plugin-pagefind: fix v-model:value syntax for Vue 3.5+
 * 2. Clear Vite caches
 */
const { readFileSync, writeFileSync, rmSync } = require('fs')
const { resolve } = require('path')

// === Fix pagefind v-model:value ===
const searchVue = resolve(process.cwd(), 'node_modules/vitepress-plugin-pagefind/src/Search.vue')
try {
  let content = readFileSync(searchVue, 'utf-8')
  if (content.includes('v-model:value')) {
    content = content.replace(
      'v-model:value="searchWords"',
      ':value="searchWords" @update:value="searchWords = $event"'
    )
    writeFileSync(searchVue, content)
    console.log('[postinstall] Fixed pagefind v-model:value')
  }
} catch (e) {}

// === Clear Vite caches ===
const cacheDirs = [
  'docs/.vitepress/cache',
  'node_modules/.vite',
]
for (const dir of cacheDirs) {
  try { rmSync(resolve(process.cwd(), dir), { recursive: true, force: true }) } catch (e) {}
}
