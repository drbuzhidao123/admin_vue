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
    });
  },
  noticeCount() {
    return request({
      url: "/leave/count",
      method: "get",
      data: {},
    });
  },
  getMenuList() {
    return request({
      url: "/menu/list",
      method: "get",
      data: {},
    });
  },
};
