import { createStore } from "vuex";
import mutations from "./mutations";
import storage from "./../util/storage";

const state = {
  userInfo: "" | storage.getItem("userInfo"), //获取用户信息
};

export default createStore({
  state: state,
  mutations: mutations, //引入自定义的mutation方法
});
