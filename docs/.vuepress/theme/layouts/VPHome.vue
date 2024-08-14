<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <ArticleList :items="blogs.items" />
      </main>
    </template>
  </ParentLayout>
</template>

<script setup>
import { useBlogType } from "@vuepress/plugin-blog/client";
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
import ArticleList from "../components/ArticleList.vue";

// 获取博客数据
const blogs = useBlogType("blog");
</script>

<style lang="scss" scoped>
.page {
  padding-top: var(--navbar-height);
}
</style>
