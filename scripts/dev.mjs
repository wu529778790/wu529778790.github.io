#!/usr/bin/env node
/**
 * 开发服务器启动器：
 * 并行运行 vitepress dev + auto-frontmatter 监听器，
 * Ctrl+C 时统一退出，不留孤儿进程。
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bin = path.join(root, 'node_modules', '.bin')

const kids = []
function run(cmd, args) {
  const p = spawn(cmd, args, { stdio: 'inherit', cwd: root })
  kids.push(p)
  return p
}

run(path.join(bin, 'vitepress'), ['dev', 'docs'])
run(process.execPath, [path.join(root, 'scripts', 'auto-frontmatter.mjs'), '--watch'])

function shutdown() {
  for (const p of kids) p.kill('SIGTERM')
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
