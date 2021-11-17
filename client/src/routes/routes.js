import { createRouter, createWebHistory } from "vue-router";
import NotFound from '../components/NotFound.vue'
import Dashboard from '../components/dashboard/Dashboard.vue'
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;