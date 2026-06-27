/**
 * Postinstall script: fixes dependency compatibility issues.
 *
 * 1. @vue/compiler-core: genNode null-safety for @sugarat/theme slots
 * 2. vitepress-plugin-pagefind: fix v-model:value syntax for Vue 3.5+
 * 3. Clear Vite caches to ensure patches take effect
 */
const { readFileSync, writeFileSync, rmSync } = require('fs')
const { resolve } = require('path')

const PATCH_MARKER = '__vp_patched'

// === Fix 1: compiler-core genNode null-safety ===
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
    if (content.includes(PATCH_MARKER)) continue

    let changed = false

    // genNode null-safety
    const patterns = [
      ['shared.isString', 'function genNode(node, context) {\n  if (shared.isString(node)) {'],
      ['isString', 'function genNode(node, context) {\n  if (isString(node)) {'],
    ]
    for (const [check, old] of patterns) {
      if (content.includes(old)) {
        content = content.replace(old,
          `function genNode(node, context) {\n  if (!node) { return; }\n  if (${check}(node)) {`
        )
        changed = true
        break
      }
    }

    // Replace assert(codegenNode != null) (dev version)
    const assertOld = 'assert(\n        node.codegenNode != null,'
    if (content.includes(assertOld)) {
      content = content.replace(
        /assert\(\s*\n\s*node\.codegenNode != null,\s*\n\s*`[^`]*`\s*\n\s*\);\s*\n\s*genNode\(node\.codegenNode/g,
        'if (node.codegenNode == null) { return; }\n      genNode(node.codegenNode'
      )
      changed = true
    }

    // emitError: suppress markdown HTML parser errors (prod version)
    const emitOld = 'function emitError(code, index, message) {\n  currentOptions.onError(\n    createCompilerError(code, getLoc(index, index), void 0, message)\n  );\n}'
    if (content.includes(emitOld)) {
      content = content.replace(emitOld,
        'function emitError(code, index, message) {\n  if ([2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].includes(code)) { return; }\n  currentOptions.onError(\n    createCompilerError(code, getLoc(index, index), void 0, message)\n  );\n}'
      )
      changed = true
    }

    if (changed) {
      content += `\n// ${PATCH_MARKER}\n`
      writeFileSync(filePath, content)
      patched++
    }
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

// === Fix 3: clear Vite caches ===
const cacheDirs = [
  'docs/.vitepress/cache',
  'node_modules/.vite',
]
for (const dir of cacheDirs) {
  try { rmSync(resolve(process.cwd(), dir), { recursive: true, force: true }) } catch (e) {}
}
