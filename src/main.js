import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ElButton } from "element-plus";
import "element-plus/dist/index.css";
import request from "./util/request";

const app = createApp(App);
app.config.globalProperties.$request = request;
app.use(store).use(router).use(ElButton).mount("#app");
