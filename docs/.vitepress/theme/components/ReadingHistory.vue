<script setup lang="ts">
import { useReadingHistory } from '../composables/useReadingHistory'

const { history, clearHistory } = useReadingHistory()

function formatTime(ts: number) {
  const diff = Date.now() - ts
  if (diff < 60_000) return '刚刚'
  if (diff < 3600_000) return `${Math.floor(diff / 60_000)} 分钟前`
  if (diff < 86400_000) return `${Math.floor(diff / 3600_000)} 小时前`
  if (diff < 604800_000) return `${Math.floor(diff / 86400_000)} 天前`
  return new Date(ts).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <div v-if="history.length > 0" class="sidebar-card sidebar-history">
    <div class="sidebar-history-header">
      <h3 class="sidebar-history-title">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
          <path d="M12 7v5l4 2"/>
        </svg>
        最近阅读
      </h3>
      <button class="sidebar-history-clear" @click="clearHistory" title="清除记录">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"/>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
      </button>
    </div>
    <div class="sidebar-history-list">
      <a
        v-for="item in history.slice(0, 8)"
        :key="item.url"
        :href="item.url"
        class="sidebar-history-item"
      >
        <span class="sidebar-history-item-title">{{ item.title }}</span>
        <span class="sidebar-history-item-time">{{ formatTime(item.time) }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.sidebar-history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
}

.sidebar-history-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-1);
  margin: 0;
}

.sidebar-history-title svg {
  color: var(--color-accent);
}

.sidebar-history-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: var(--color-text-3);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.sidebar-history-clear:hover {
  background: var(--color-muted);
  color: var(--color-destructive);
}

.sidebar-history-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-history-item {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.sidebar-history-item:hover {
  background: var(--color-muted);
}

.sidebar-history-item-title {
  flex: 1;
  min-width: 0;
  font-size: var(--text-xs);
  color: var(--color-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}

.sidebar-history-item:hover .sidebar-history-item-title {
  color: var(--color-accent);
}

.sidebar-history-item-time {
  flex-shrink: 0;
  font-size: 10px;
  color: var(--color-text-3);
}
</style>
