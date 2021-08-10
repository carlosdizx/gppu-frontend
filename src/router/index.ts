import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/registro",
    name: "Registro",
    component: () => import("../views/Registro.vue"),
  },
  {
    path: "/",
    name: "InicioSesion",
    component: () => import("../views/InicioSesion.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
