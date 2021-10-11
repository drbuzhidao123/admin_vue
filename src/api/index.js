/**
 *请求接口管理
 */

import request from "./../utils/request";
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
  editUser(params) {
    return request({
      url: "/user/editUser",
      method: "post",
      data: params,
      mock: false,
    });
  },
  changeStatus(params) {
    return request({
      url: "/user/changeStatus",
      method: "post",
      data: params,
      mock: false,
    });
  },
  delUser(params) {
    return request({
      url: "/user/delUser",
      method: "post",
      data: params,
      mock: false,
    });
  },
  delManyUser(params) {
    return request({
      url: "/user/delManyUser",
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
  getAllDeptList(params) {
    return request({
      url: "/dept/getAllDeptList",
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

  delMenu(params) {
    return request({
      url: "/menu/delMenu",
      method: "post",
      data: params,
      mock: false,
    });
  },

  getRoleList(params) {
    return request({
      url: "/role/getRoleList",
      method: "post",
      data: params,
      mock: false,
    });
  },

  getAllRoleList(params) {
    return request({
      url: "/role/getAllRoleList",
      method: "post",
      data: params,
      mock: false,
    });
  },

  addRole(params) {
    return request({
      url: "/role/addRole",
      method: "post",
      data: params,
      mock: false,
    });
  },

  editRole(params) {
    return request({
      url: "/role/editRole",
      method: "post",
      data: params,
      mock: false,
    });
  },

  delRole(params) {
    return request({
      url: "/role/delRole",
      method: "post",
      data: params,
      mock: false,
    });
  },

  updatePermission(params) {
    return request({
      url: "/role/updatePermission",
      method: "post",
      data: params,
      mock: false,
    });
  },
};
