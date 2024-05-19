import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    // component: () => import("./Layout/index.vue"),
    redirect: "/index",
    children: [
      {
        path: "/index",
        component: () => import("@/views/index/index.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app) {
  app.use(router);
}
