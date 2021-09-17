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
};
