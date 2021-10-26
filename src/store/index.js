import { createStore } from "vuex";
import mutations from "./mutations";
import storage from "./../utils/storage";

const state = {
  userInfo: storage.getItem("userInfo") || {}, //用户信息
  userRoleName: storage.getItem("userRoleName") || null,
  userMenuList: storage.getItem("userMenuList") || [], //权限菜单
  actionList: storage.getItem("actionList"), //权限按钮
  noticeCount: storage.getItem("noticeCount") || null,
  leavesCount: storage.getItem("leavesCount") || null,
  userCount: storage.getItem("userCount") || null,
  menuCount: storage.getItem("menuCount") || null,
  roleCount: storage.getItem("roleCount") || null,
  deptCount: storage.getItem("deptCount") || null,
};

export default createStore({
  state: state,
  mutations: mutations, //引入自定义的mutation方法
});
