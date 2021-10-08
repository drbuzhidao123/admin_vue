import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import Welcome from "../views/Welcome.vue";
/* import User from "../views/User.vue";
import Menu from "../views/Menu.vue";
import Role from "../views/Role.vue";
import Dept from "../views/Dept.vue"; */
import Error from "../views/Error.vue";
import storage from "./../util/storage";
import API from "./../api";
import utils from "./../util/utils";

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    name: "index",
    path: "/",
    meta: {
      title: "首页",
    },
    component: Index,
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        meta: {
          title: "欢迎页",
        },
        component: Welcome,
      },

      /*     {
        path: "/system/user",
        meta: {
          title: "用户管理",
        },
        component: User,
      },
      {
        path: "/system/menu",
        meta: {
          title: "菜单管理",
        },
        component: Menu,
      },
      {
        path: "/system/role",
        meta: {
          title: "角色管理",
        },
        component: Role,
      },
      {
        path: "/system/dept",
        meta: {
          title: "部门管理",
        },
        component: Dept,
      }, */
    ],
  },
  {
    name: "error",
    path: "/error",
    component: Error,
    meta: {
      title: "错误页面",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

//动态获取用户的权限路由,在这里运行是为了避免刷新，因为刷新后router重新刷新路由，会失去在login组件添加的router路由
async function loadAsyncRoutes() {
  let token = storage.getItem("token") || {};
  let userInfo = storage.getItem("userInfo") || {};
  if (token) {
    try {
      const menuList = await API.getUserMenuList({
        userId: userInfo.id,
      });
      let routes = utils.generateRoute(menuList);
      routes.map((route) => {
        console.log(route.component);
        //let url = "../views/" + route.component + ".vue";
        route.component = () => import("../views/User");
        router.addRoute("index", route);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

loadAsyncRoutes();

//判断地址是否可以访问，不能访问跳转到error
function checkPermission(path) {
  let hasPermission = router
    .getRoutes()
    .filter((item) => item.path == path).length;
  if (hasPermission) {
    return true;
  } else {
    return false;
  }
}

//路由守卫
router.beforeEach((to, from, next) => {
  const tokenStr = storage.getItem("token");
  /*if (to.matched.length === 0) {
    from.name ? next({ name: from.name }) : next("/error");
  }*/
  if (!checkPermission(to.path)) {
    return next("/error");
  }
  //访问登录页的时候直接放行
  if (to.path == "/login") {
    return next();
  }
  //没有token，强制跳转
  if (!tokenStr) {
    return next("/login");
  }
  document.title = to.meta.title;
  next();
});

export default router;
