import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "LandingLayout",
      path: "/landing",
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
      path: "/",
      component: () => import("../modules/auth/module.vue"),
      children: [
        {
          name: "Login",
          path: "",
          component: () => import("../modules/auth/views/Login.vue"),
        },
        {
          name: "Register",
          path: "register",
          component: () => import("../modules/auth/views/Register.vue"),
        },
      ],
    },
  ],
});

export default router;
