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
  getUserCount() {
    return request({
      url: "/user/getUserCount",
      method: "post",
      data: {},
      mock: false,
    });
  },
  getMenuCount() {
    return request({
      url: "/menu/getMenuCount",
      method: "post",
      data: {},
      mock: false,
    });
  },
  getRoleCount() {
    return request({
      url: "/role/getRoleCount",
      method: "post",
      data: {},
      mock: false,
    });
  },
  getDeptCount() {
    return request({
      url: "/dept/getDeptCount",
      method: "post",
      data: {},
      mock: false,
    });
  },
  getRoleName(params) {
    return request({
      url: "/role/getRoleName",
      method: "post",
      data: params,
      mock: false,
    });
  },
  getLog(params) {
    return request({
      url: "/tool/getLog",
      method: "post",
      data: params,
      mock: false,
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

  getRoleMenuList(params) {
    return request({
      url: "/menu/getRoleMenuList",
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
