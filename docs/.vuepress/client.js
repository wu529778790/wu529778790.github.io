import { defineClientConfig } from "vuepress/client";
// import Article from "./layouts/Article.vue";
// import Category from "./layouts/Category.vue";
// import Tag from "./layouts/Tag.vue";
// import Timeline from "./layouts/Timeline.vue";
import Blog from "./layouts/Blog.vue";

export default defineClientConfig({
  // we provide some blog layouts
  layouts: {
    // Article,
    // Category,
    // Tag,
    // Timeline,
    Blog,
  },
});
