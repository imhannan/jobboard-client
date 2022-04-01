import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Index,
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/jobs",
      name: "jobs",
      component: () => import("@/layouts/JobLayout.vue"),
      children: [
        {
          path: "",
          name: "jobs.index",
          component: () => import("@/views/jobs/Index.vue"),
        },
        {
          path: ":slug",
          name: "jobs.details",
          component: () => import("@/views/jobs/JobDetails.vue"),
        },
        {
          path: ":slug/apply",
          name: "jobs.apply",
          component: () => import("@/views/jobs/JobApplication.vue"),
        },
        {
          path: "create",
          name: "jobs.create",
          component: () => import("@/views/jobs/JobCreate.vue"),
        },
        {
          path: ":slug/edit",
          name: "jobs.edit",
          component: () => import("@/views/jobs/JobEdit.vue"),
        },
        {
          path: ":slug/delete",
          name: "jobs.delete",
          component: () => import("@/views/jobs/JobDelete.vue"),
        },
      ],
    },
    {
      path: "/applications",
      name: "applications",
      component: () => import("@/layouts/ApplicationLayout.vue"),
      children: [
        {
          path: "",
          name: "applications.index",
          component: () => import("@/views/applications/Index.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
