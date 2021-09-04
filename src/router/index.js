import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import Welcome from "../views/Welcome.vue";

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
    children: [
      {
        path: "/welcome",
        component: Welcome,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
