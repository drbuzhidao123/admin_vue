import { createStore } from "vuex";
import mutations from "./mutations";
import storage from "./../util/storage";

const state = {
  userInfo: storage.getItem("userInfo") || {}, //用户信息
  userMenuList: storage.getItem("userMenuList") || [], //权限菜单
};

export default createStore({
  state: state,
  mutations: mutations, //引入自定义的mutation方法
});
