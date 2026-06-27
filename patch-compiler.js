/**
 * Postinstall script: fixes dependency compatibility issues.
 *
 * 1. compiler-core (prod only): add null-safety to genNode for @sugarat/theme compat
 * 2. vitepress-plugin-pagefind: fix v-model:value syntax for Vue 3.5+
 */
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

// === Fix 1: compiler-core prod genNode null-safety ===
const prodFile = resolve(process.cwd(), 'node_modules/@vue/compiler-core/dist/compiler-core.cjs.prod.js')
try {
  let content = readFileSync(prodFile, 'utf-8')
  if (!content.includes('__vp_patched')) {
    // Add null check at the start of genNode
    const old = 'function genNode(node, context) {\n  if (shared.isString(node)) {'
    const rep = 'function genNode(node, context) {\n  if (!node) { return; }\n  if (shared.isString(node)) {'
    if (content.includes(old)) {
      content = content.replace(old, rep)
      content += '\n// __vp_patched\n'
      writeFileSync(prodFile, content)
      console.log('[postinstall] Patched compiler-core prod genNode')
    }
  }
} catch (e) {}

// === Fix 2: pagefind v-model:value ===
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
