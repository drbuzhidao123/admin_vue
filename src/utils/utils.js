/**
 * 工具函数封装
 */
export default {
  formateDate(date, rule) {
    let fmt = rule || "yyyy-MM-dd hh:mm:ss";
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, date.getFullYear());
    }
    const o = {
      // 'y+': date.getFullYear(),
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const val = o[k] + "";
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? val : ("00" + val).substr(val.length)
        );
      }
    }
    return fmt;
  },
  generateRoute(menuList) {
    let routes = [];
    const deepList = (list) => {
      while (list.length) {
        let item = list.pop();
        if (item.menuType == 1) {
          if (!item.children || item.children[0].menuType == 2) {
            routes.push({
              name: item.component,
              path: item.path,
              meta: {
                title: item.menuName,
              },
              componentName: item.component,
            });
          }
        }
        if (item.children) {
          deepList(item.children);
        }
      }
    };
    deepList(menuList);
    return routes;
  },

  generateAction(menuList) {
    let action = [];
    const deepList = (menuList) => {
      for (let item of menuList) {
        if (item.menuType == 2) {
          action.push(item.menuCode);
        }
        if (item.children) {
          deepList(item.children);
        }
      }
    };
    deepList(menuList);
    return action;
  },
};
