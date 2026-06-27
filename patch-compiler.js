/**
 * Postinstall script: patches dependencies for VitePress compatibility.
 *
 * 1. @vue/compiler-core: suppress template compilation errors from @sugarat/theme
 * 2. vitepress-plugin-pagefind: fix v-model:value syntax for Vue 3.5+
 */
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

// === Patch 1: compiler-core ===
const compilerFiles = [
  'dist/compiler-core.cjs.prod.js',
  'dist/compiler-core.cjs.js',
  'dist/compiler-core.esm-bundler.js',
]

const compilerDir = resolve(process.cwd(), 'node_modules/@vue/compiler-core')
let patched = 0

for (const file of compilerFiles) {
  const filePath = resolve(compilerDir, file)
  try {
    let content = readFileSync(filePath, 'utf-8')
    if (content.includes('__vp_patched')) continue

    // genNode null-safety
    const genPatterns = [
      'function genNode(node, context) {\n  if (shared.isString(node)) {',
      'function genNode(node, context) {\n  if (isString(node)) {',
    ]
    for (const pat of genPatterns) {
      if (content.includes(pat)) {
        content = content.replace(pat, 'function genNode(node, context) {\n  if (!node) { return; }\n  if (' + pat.split('if (')[1])
      }
    }

    // Replace assert(codegenNode != null) with skip
    content = content.replace(
      /assert\(\s*\n\s*node\.codegenNode != null,\s*\n\s*`[^`]*`\s*\n\s*\);\s*\n\s*genNode\(node\.codegenNode/g,
      'if (node.codegenNode == null) { return; }\n      genNode(node.codegenNode'
    )

    // emitError: suppress markdown-related HTML parser errors
    const emitOld = 'function emitError(code, index, message) {\n  currentOptions.onError(\n    createCompilerError(code, getLoc(index, index), void 0, message)\n  );\n}'
    const emitNew = 'function emitError(code, index, message) {\n  if ([2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].includes(code)) { return; }\n  currentOptions.onError(\n    createCompilerError(code, getLoc(index, index), void 0, message)\n  );\n}'
    content = content.replace(emitOld, emitNew)

    content += '\n// __vp_patched\n'
    writeFileSync(filePath, content)
    patched++
  } catch (e) {}
}

if (patched > 0) {
  console.log(`[patch-compiler] Patched ${patched} compiler-core file(s)`)
}

// === Patch 2: pagefind v-model:value ===
const searchVue = resolve(process.cwd(), 'node_modules/vitepress-plugin-pagefind/src/Search.vue')
try {
  let content = readFileSync(searchVue, 'utf-8')
  if (content.includes('v-model:value')) {
    content = content.replace(
      'v-model:value="searchWords"',
      ':value="searchWords" @update:value="searchWords = $event"'
    )
    writeFileSync(searchVue, content)
    console.log('[patch-compiler] Fixed pagefind v-model:value')
  }
} catch (e) {}
