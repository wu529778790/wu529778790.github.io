<script setup>
import { useBlogType } from "@vuepress/plugin-blog/client";
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
import ArticleList from "../components/ArticleList.vue";

const timelines = useBlogType("timeline");
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <h1 class="timeline-title">时间轴</h1>
        <ArticleList :items="timelines.items" is-timeline />
      </main>
    </template>
  </ParentLayout>
</template>

<style lang="scss" scoped>
.page {
  padding-top: var(--navbar-height);
}

.timeline-title {
  padding: 0;
  text-align: center;
}
</style>
