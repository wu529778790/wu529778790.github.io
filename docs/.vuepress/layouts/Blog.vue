<script setup>
import { useBlogType } from "@vuepress/plugin-blog/client";
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
import ArticleList from "../components/ArticleList.vue";

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
.blog-title {
  padding: 0;
  text-align: center;
}
</style>
