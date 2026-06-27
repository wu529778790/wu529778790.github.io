/**
 * Postinstall script: fixes dependency compatibility issues.
 *
 * 1. Clear Vite/VitePress caches (deps may have changed)
 * 2. vitepress-plugin-pagefind: fix v-model:value syntax for Vue 3.5+
 *
 * Note: compiler-core patches are handled by docs/.vitepress/build-fix.js
 * at build time, not here. This avoids breaking dev mode.
 */
const { readFileSync, writeFileSync, rmSync } = require('fs')
const { resolve } = require('path')

// === Clear caches ===
const cacheDirs = [
  'docs/.vitepress/cache',
  'node_modules/.vite',
]
for (const dir of cacheDirs) {
  try { rmSync(resolve(process.cwd(), dir), { recursive: true, force: true }) } catch (e) {}
}

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
