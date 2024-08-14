<template>
  <div class="article-wrapper">
    <article v-for="{ info, path } in items" :key="path" class="article">
      <header class="title" @click="$router.push(path)">
        {{ info.title }}
      </header>
      <hr />
      <div class="article-info">
        <span v-if="info.author" class="author">Author: {{ info.author }}</span>
        <span v-if="info.date" class="date">
          {{ new Date(info.date).toLocaleDateString() }}
        </span>
      </div>
      <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
    </article>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss">
.article-wrapper {
  margin: 0 auto;
  max-width: var(--content-width);
  padding: 1rem;
  text-align: center;
}

.article {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto 1.25rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--c-border);
  border-radius: 0.4rem;
  color: var(--c-text);
  text-align: start;
  background-color: #fff;
  @media (max-width: 419px) {
    border-radius: 0;
  }
  .title {
    position: relative;
    display: inline-block;
    font-size: 1.28rem;
    line-height: 2rem;
    font-weight: 600;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      inset-inline-start: 0;
      width: 100%;
      height: 2px;
      background: var(--c-brand);
      visibility: hidden;
      transition: transform 0.3s ease-in-out;
      transform: scaleX(0);
    }
    &:hover {
      cursor: pointer;
      &::after {
        visibility: visible;
        transform: scaleX(1);
      }
    }
    a {
      color: inherit;
    }
  }

  .article-info {
    display: flex;
    flex-shrink: 0;
    > span {
      margin-inline-end: 0.5em;
      line-height: 1.8;
    }
  }

  .excerpt {
    h1 {
      display: none;
    }
    h2 {
      font-size: 1.2em;
    }
    h3 {
      font-size: 1.15em;
    }
    img {
      width: 100%;
    }
  }
}
</style>
