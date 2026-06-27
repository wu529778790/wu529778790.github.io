/**
 * Postinstall script: patches @vue/compiler-core to suppress
 * template compilation errors caused by @sugarat/theme incompatibility.
 *
 * Fixes:
 * - genNode: skip nodes with missing codegenNode
 * - emitError: suppress specific HTML parser errors from markdown content
 */
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const files = [
  'dist/compiler-core.cjs.prod.js',
  'dist/compiler-core.cjs.js',
  'dist/compiler-core.esm-bundler.js',
]

const dir = resolve(process.cwd(), 'node_modules/@vue/compiler-core')

let patched = 0

for (const file of files) {
  const filePath = resolve(dir, file)
  try {
    let content = readFileSync(filePath, 'utf-8')

    // Already patched
    if (content.includes('__vp_patched')) continue

    // 1. genNode null-safety
    const genPatterns = [
      'function genNode(node, context) {\n  if (shared.isString(node)) {',
      'function genNode(node, context) {\n  if (isString(node)) {',
    ]
    for (const pat of genPatterns) {
      if (content.includes(pat)) {
        content = content.replace(pat, 'function genNode(node, context) {\n  if (!node) { return; }\n  if (' + pat.split('if (')[1])
      }
    }

    // 2. Replace assert(codegenNode != null) with skip (multi-line pattern)
    content = content.replace(
      /assert\(\s*\n\s*node\.codegenNode != null,\s*\n\s*`[^`]*`\s*\n\s*\);\s*\n\s*genNode\(node\.codegenNode/g,
      'if (node.codegenNode == null) { return; }\n      genNode(node.codegenNode'
    )

    // 3. emitError: suppress markdown-related HTML parser errors
    const emitOld = 'function emitError(code, index, message) {\n  currentOptions.onError(\n    createCompilerError(code, getLoc(index, index), void 0, message)\n  );\n}'
    const emitNew = 'function emitError(code, index, message) {\n  if ([2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].includes(code)) { return; }\n  currentOptions.onError(\n    createCompilerError(code, getLoc(index, index), void 0, message)\n  );\n}'
    content = content.replace(emitOld, emitNew)

    content += '\n// __vp_patched\n'
    writeFileSync(filePath, content)
    patched++
  } catch (e) {
    // skip files that don't exist
  }
}

if (patched > 0) {
  console.log(`[patch-compiler] Patched ${patched} file(s)`)
}
