import { createRouter, createWebHistory } from "vue-router";
import AbilitiesView from "../views/AbilitiesView.vue";
import CardsView from "../views/CardsView.vue";
import ColorsView from "../views/ColorsView.vue";
import HomeView from "../views/HomeView.vue";
import SkillsView from "../views/SkillsView.vue";

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
    {
      path: "/skills",
      name: "skills",
      component: SkillsView,
    },
    {
      path: "/abilities",
      name: "abilities",
      component: AbilitiesView,
    },
    {
      path: "/colors",
      name: "colors",
      component: ColorsView,
    },
  ],
});

export default router;
