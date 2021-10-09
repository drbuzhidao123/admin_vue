import { createStore } from "vuex";
import mutations from "./mutations";
import storage from "./../utils/storage";

const state = {
  userInfo: storage.getItem("userInfo") || {}, //用户信息
  userMenuList: storage.getItem("userMenuList") || [], //权限菜单
  actionList: storage.getItem("actionList"), //权限按钮
  noticeCount: 0,
};

export default createStore({
  state: state,
  mutations: mutations, //引入自定义的mutation方法
});
