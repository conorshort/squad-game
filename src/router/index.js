import { createRouter, createWebHistory } from "vue-router";
import Play from "../views/Play.vue";
import NewGame from "../views/NewGame.vue";
import ViewGames from "../views/ViewGames.vue";


const routes = [
  {
    path: "/",
    name: "View Games",
    component: ViewGames,
  },
  {
    path: "/play",
    name: "Play",
    component: Play,
  },
  {
    path: "/new",
    name: "New Game",
    component: NewGame,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/:other",
    redirect: "/",
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
