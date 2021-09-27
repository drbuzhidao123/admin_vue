/**
 *请求接口管理
 */

import request from "./../util/request";
export default {
  login(params) {
    return request({
      url: "/login/check",
      method: "post",
      data: params,
      mock: false,
    });
  },
  noticeCount() {
    return request({
      url: "/leave/count",
      method: "get",
      data: {},
      mock: true,
    });
  },
  getUserMenuList(params) {
    return request({
      url: "/menu/getMenuListByUserId",
      method: "post",
      data: params,
      mock: false,
    });
  },
  getUserList(params) {
    return request({
      url: "/user/getUserList",
      method: "post",
      data: params,
      mock: false,
    });
  },
  getAllUserList(params) {
    return request({
      url: "/user/getAllUserList",
      method: "post",
      data: params,
      mock: false,
    });
  },
  addUser(params) {
    return request({
      url: "/user/addUser",
      method: "post",
      data: params,
      mock: false,
    });
  },
  getDeptList(params) {
    return request({
      url: "/dept/getDeptList",
      method: "post",
      data: params,
      mock: false,
    });
  },
  addDept(params) {
    return request({
      url: "/dept/addDept",
      method: "post",
      data: params,
      mock: false,
    });
  },
  editDept(params) {
    return request({
      url: "/dept/editDept",
      method: "post",
      data: params,
      mock: false,
    });
  },
  delDept(params) {
    return request({
      url: "/dept/delDept",
      method: "post",
      data: params,
      mock: false,
    });
  },

  getMenuList(params) {
    return request({
      url: "/menu/getMenuList",
      method: "post",
      data: params,
      mock: false,
    });
  },

  addMenu(params) {
    return request({
      url: "/menu/addMenu",
      method: "post",
      data: params,
      mock: false,
    });
  },

  editMenu(params) {
    return request({
      url: "/menu/editMenu",
      method: "post",
      data: params,
      mock: false,
    });
  },

  deleteMenu(params) {
    return request({
      url: "/menu/deleteMenu",
      method: "post",
      data: params,
      mock: false,
    });
  },
};
