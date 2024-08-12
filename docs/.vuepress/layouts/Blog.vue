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
        <h1 class="blog-title">时间轴</h1>
        <ArticleList :items="blogs.items" isTimeline />
      </main>
    </template>
  </ParentLayout>
</template>

<style lang="scss">
.blog-title {
  padding: 0;
  text-align: center;
}
</style>
