import { createRouter, createWebHistory } from "vue-router";
import Proizvodi from "../components/Proizvodi.vue";
import Proizvod from "../components/Proizvod.vue";

const routes = [
  { path: "/", redirect: "/proizvodi" },
  { path: "/proizvodi", component: Proizvodi },
  { path: "/proizvodi/:id", component: Proizvod },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
