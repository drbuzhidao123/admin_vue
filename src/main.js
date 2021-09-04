import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/css/global.css";
import request from "./util/request";
import storage from "./util/storage";

const app = createApp(App);
app.config.globalProperties.$request = request;
app.config.globalProperties.$storage = storage;
app.use(store).use(router).use(ElementPlus).mount("#app");
