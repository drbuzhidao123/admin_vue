/**
 * Mutations业务层数据提交
 */
import storage from "../utils/storage";

export default {
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    storage.setItem("userInfo", userInfo);
  },
  saveUserMenu(state, userMenuList) {
    state.userMenuList = userMenuList;
    storage.setItem("userMenuList", userMenuList);
  },
  saveActionList(state, actionList) {
    state.actionList = actionList;
    storage.setItem("actionList", actionList);
  },
  saveNoticeCount(state, noticeCount) {
    state.noticeCount = noticeCount;
    storage.setItem("noticeCount", noticeCount);
  },
  saveLeavesCount(state, leavesCount) {
    state.leavesCount = leavesCount;
    storage.setItem("leavesCount", leavesCount);
  },
  saveUserCount(state, userCount) {
    state.userCount = userCount;
    storage.setItem("userCount", userCount);
  },
  saveMenuCount(state, menuCount) {
    state.menuCount = menuCount;
    storage.setItem("menuCount", menuCount);
  },
  saveRoleCount(state, roleCount) {
    state.roleCount = roleCount;
    storage.setItem("roleCount", roleCount);
  },
  saveDeptCount(state, deptCount) {
    state.deptCount = deptCount;
    storage.setItem("deptCount", deptCount);
  },
  saveUserRoleName(state, userRoleName) {
    state.userRoleName = userRoleName;
    storage.setItem("userRoleName", userRoleName);
  },
};
