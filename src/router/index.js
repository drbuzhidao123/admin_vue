import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import Welcome from "../views/Welcome.vue";
import storage from "../util/storage";

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/index",
    component: Index,
    redirect: "/welcome",
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "/welcome",
        meta: {
          title: "欢迎页",
        },
        component: Welcome,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

//路由守卫
router.beforeEach((to, from, next) => {
  const tokenStr = storage.getItem("token");
  if (to.matched.length === 0) {
    from.name ? next({ name: from.name }) : next("/error");
  }
  //访问登录页的时候直接放行
  if (to.path == "/login") {
    return next();
  }
  //没有token，强制跳转
  if (!tokenStr) {
    return next("/login");
  }
  next();
});

export default router;
