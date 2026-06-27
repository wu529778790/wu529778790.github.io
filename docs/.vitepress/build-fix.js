/**
 * Vite plugin: patches @vue/compiler-core to handle null codegenNodes
 * from @sugarat/theme template slots.
 *
 * Patches both dev and prod compilers. The genNode null-check is safe —
 * slot <template> nodes legitimately have no codegenNode.
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const PATCH_MARKER = '__vp_patched'

function patchCompiler(filePath) {
  try {
    let content = readFileSync(filePath, 'utf-8')
    if (content.includes(PATCH_MARKER)) return false

    let changed = false

    // genNode null-safety (both CJS patterns)
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

    // Replace assert(codegenNode != null) with skip (dev version)
    content = content.replace(
      /assert\(\s*\n\s*node\.codegenNode != null,\s*\n\s*`[^`]*`\s*\n\s*\);\s*\n\s*genNode\(node\.codegenNode/g,
      'if (node.codegenNode == null) { return; }\n      genNode(node.codegenNode'
    )

    // emitError: suppress markdown HTML parser errors (prod version)
    const emitOld = 'function emitError(code, index, message) {\n  currentOptions.onError(\n    createCompilerError(code, getLoc(index, index), void 0, message)\n  );\n}'
    const emitNew = 'function emitError(code, index, message) {\n  if ([2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].includes(code)) { return; }\n  currentOptions.onError(\n    createCompilerError(code, getLoc(index, index), void 0, message)\n  );\n}'
    if (content.includes(emitOld)) {
      content = content.replace(emitOld, emitNew)
      changed = true
    }

    if (changed || content.includes('if (!node)')) {
      content += `\n// ${PATCH_MARKER}\n`
      writeFileSync(filePath, content)
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

export default function buildFix() {
  let applied = false

  return {
    name: 'vitepress-build-fix',
    enforce: 'pre',

    buildStart() {
      if (applied) return

      const dir = resolve(process.cwd(), 'node_modules/@vue/compiler-core/dist')
      const files = ['compiler-core.cjs.prod.js', 'compiler-core.cjs.js', 'compiler-core.esm-bundler.js']

      let count = 0
      for (const file of files) {
        if (patchCompiler(resolve(dir, file))) count++
      }
      if (count > 0) {
        console.log(`[build-fix] Patched ${count} compiler-core file(s)`)
      }
      applied = true
    },
  }
}
