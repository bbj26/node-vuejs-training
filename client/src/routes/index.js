import { createRouter, createWebHistory } from "vue-router";
import NotFound from '../components/NotFound.vue';
import Dashboard from '../components/dashboard/Dashboard';
import UserManagement from '../components/user-management';

const routes = [
  {
    path: "/dashboard",
    alias: '/',
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/user-management",
    name: "User Management",
    component: UserManagement
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