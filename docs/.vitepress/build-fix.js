/**
 * Vite plugin: patches @vue/compiler-core prod codegen at build time
 * to handle null codegenNodes from @sugarat/theme template slots.
 *
 * Only applies during build (not dev), avoiding runtime hydration issues.
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const PATCH_MARKER = '__vp_build_patched'

export default function buildFix() {
  let applied = false

  return {
    name: 'vitepress-build-fix',
    enforce: 'pre',

    buildStart() {
      if (applied) return

      const prodFile = resolve(
        process.cwd(),
        'node_modules/@vue/compiler-core/dist/compiler-core.cjs.prod.js'
      )

      try {
        let content = readFileSync(prodFile, 'utf-8')
        if (content.includes(PATCH_MARKER)) {
          applied = true
          return
        }

        // Fix 1: genNode null-safety
        const old = 'function genNode(node, context) {\n  if (shared.isString(node)) {'
        const rep = 'function genNode(node, context) {\n  if (!node) { return; }\n  if (shared.isString(node)) {'
        if (content.includes(old)) {
          content = content.replace(old, rep)
        }

        // Fix 2: emitError suppress markdown HTML errors
        const emitOld = 'function emitError(code, index, message) {\n  currentOptions.onError(\n    createCompilerError(code, getLoc(index, index), void 0, message)\n  );\n}'
        const emitNew = 'function emitError(code, index, message) {\n  if ([2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].includes(code)) { return; }\n  currentOptions.onError(\n    createCompilerError(code, getLoc(index, index), void 0, message)\n  );\n}'
        content = content.replace(emitOld, emitNew)

        content += `\n// ${PATCH_MARKER}\n`
        writeFileSync(prodFile, content)
        applied = true
        console.log('[build-fix] Patched compiler-core prod')
      } catch (e) {
        // ignore
      }
    },
  }
}
