import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";
import store from "../store/index";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "HomeLayout",
      path: "/home",
      component: () => import("../modules/home/module.vue"),
      children: [
        {
          name: "Home",
          path: "",
          component: () => import("../modules/home/views/HomeView.vue"),
        },
      ],
    },
    {
      name: "LandingLayout",
      path: "/",
      component: () => import("../modules/landing/module.vue"),
      children: [
        {
          name: "Landing",
          path: "",
          component: () => import("../modules/landing/views/LandingView.vue"),
        },
      ],
    },
    {
      name: "LoginLayout",
      path: "/auth",
      component: () => import("../modules/auth/module.vue"),
      children: [
        {
          name: "Login",
          path: "login",
          component: () => import("../modules/auth/views/Login.vue"),
        },
        {
          name: "Register",
          path: "register",
          component: () => import("../modules/auth/views/Register.vue"),
        },
      ],
    },
    { path: "/:pathMatch(.*)*", redirect: { name: "Home" } },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  const exclude = ["Landing", "Register", "Login"];
  if (exclude.includes(to.name) && to.name !== "Landing") {
    if (store.state.authToken) {
      next({ name: "Home" });
    }
    next();
  } else {
    if (to.name !== exclude && !store.state.authToken) {
      next({ name: "Login" });
    } else {
      next();
    }
  }
}, []);

export default router;
