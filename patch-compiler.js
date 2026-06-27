/**
 * Postinstall script: fixes dependency compatibility issues.
 *
 * 1. compiler-core: add null-safety to genNode for @sugarat/theme compat
 * 2. vitepress-plugin-pagefind: fix v-model:value syntax for Vue 3.5+
 */
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

// === Fix 1: compiler-core genNode null-safety (all versions) ===
const compilerDir = resolve(process.cwd(), 'node_modules/@vue/compiler-core/dist')
const compilerFiles = [
  'compiler-core.cjs.prod.js',
  'compiler-core.cjs.js',
  'compiler-core.esm-bundler.js',
]

let patched = 0
for (const file of compilerFiles) {
  const filePath = resolve(compilerDir, file)
  try {
    let content = readFileSync(filePath, 'utf-8')
    if (content.includes('__vp_patched')) continue

    // Pattern 1: shared.isString (CJS)
    const p1 = 'function genNode(node, context) {\n  if (shared.isString(node)) {'
    // Pattern 2: isString (ESM)
    const p2 = 'function genNode(node, context) {\n  if (isString(node)) {'

    for (const [old, check] of [[p1, 'shared.isString'], [p2, 'isString']]) {
      if (content.includes(old)) {
        content = content.replace(old,
          `function genNode(node, context) {\n  if (!node) { return; }\n  if (${check}(node)) {`
        )
        break
      }
    }

    // Also patch assert(codegenNode != null) -> skip (dev version)
    content = content.replace(
      /assert\(\s*\n\s*node\.codegenNode != null,\s*\n\s*`[^`]*`\s*\n\s*\);\s*\n\s*genNode\(node\.codegenNode/g,
      'if (node.codegenNode == null) { return; }\n      genNode(node.codegenNode'
    )

    content += '\n// __vp_patched\n'
    writeFileSync(filePath, content)
    patched++
  } catch (e) {}
}

if (patched > 0) {
  console.log(`[postinstall] Patched ${patched} compiler-core file(s)`)
}

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
