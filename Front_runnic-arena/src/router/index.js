import { createRouter, createWebHistory } from "vue-router";
import CardsView from "../views/CardsView.vue";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/cards",
      name: "cards",
      component: CardsView,
    },
  ],
});

export default router;
