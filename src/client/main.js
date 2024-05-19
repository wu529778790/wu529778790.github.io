import { createApp } from "vue";
import { setupRouter } from "@/router";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// 配置路由
setupRouter(app);

app.mount("#app");
