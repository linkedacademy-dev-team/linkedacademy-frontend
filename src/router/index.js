import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
      ],
    },
  ],
});

export default router;
