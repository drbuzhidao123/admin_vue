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
};
