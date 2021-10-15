import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/css/global.css";
import "./assets/css/icon.css";
import request from "./utils/request";
import storage from "./utils/storage";
import api from "./api";
import secret from "./utils/secret";
const app = createApp(App);
app.directive("has", {
  beforeMount: function (el, binding) {
    let actionList = storage.getItem("actionList");
    let value = binding.value;
    let hasPermission = actionList.includes(value);
    if (!hasPermission) {
      el.style = "display:none";
      setTimeout(() => {
        el.parentNode.removeChild(el);
      }, 0);
    }
  },
});
app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.config.globalProperties.$storage = storage;
app.config.globalProperties.$secret = secret;
app.use(store).use(router).use(ElementPlus).mount("#app");
