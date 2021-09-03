import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ElButton } from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";
import config from "./config";

axios.get(config.mockApi + "/login").then((res) => {
  console.log(res);
});
const app = createApp(App);
app.use(store).use(router).use(ElButton).mount("#app");
