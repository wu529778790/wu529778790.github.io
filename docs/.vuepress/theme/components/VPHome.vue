<script setup>
import { useBlogType } from "@vuepress/plugin-blog/client";
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
import ArticleList from "./ArticleList.vue";

const blogs = useBlogType("blog");
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <ArticleList :items="blogs.items" isTimeline />
      </main>
    </template>
  </ParentLayout>
</template>

<style lang="scss" scoped>
.page {
  padding-top: var(--navbar-height);
}
</style>
