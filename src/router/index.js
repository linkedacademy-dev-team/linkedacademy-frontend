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
        {
          name: "Specialties",
          path: "specialties",
          component: () => import("../modules/home/views/specialities/Specialities.vue"),
        },
        {
          name: "Disabilities",
          path: "disabilities",
          component: () => import("../modules/home/views/disabilities/DisabilitiesView.vue"),
        },
        {
          name:"Educational_Models",
          path:"educational_models",
          component:()=>import("../modules/home/views/educational_models/Educational_ModelView.vue")
        },
        {
          name: "EducationalLevels",
          path: "educational_levels",
          component: () => import("../modules/home/views/levels_of_education/LevesOfEducationView.vue"),
        },
        {
          name: "Grades",
          path: "grades",
          component: () => import("../modules/home/views/grades/GradesView.vue"),
        },
        {
          name: "Schedule",
          path: "schedule",
          component: () => import("../modules/home/views/schedules/SchedulesView.vue"),
        },
        {
          name: "Languages",
          path: "languages",
          component: () => import("../modules/home/views/languages/LanguagesView.vue"),
        },
        {
          name: "Ethnicities",
          path: "ethnicities",
          component: () => import("../modules/home/views/ethnic_groups/Ethnic_GroupsView.vue"),
        },
        {
          name: "Schools",
          path: "schools",
          component: () => import("../modules/home/views/schools/SchoolsView.vue"),
        }
        
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
  const publicPages = ["Landing", "Register", "Login"];
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = store.state.authToken;

  if (loggedIn && (to.name === "Login" || to.name === "Register")) {
    next({ name: "Home" });
  } else if (!loggedIn && authRequired) {
    next({ name: "Login" });
  } else {
    next();
  }
}, []);

export default router;
