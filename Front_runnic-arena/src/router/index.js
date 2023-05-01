import { createRouter, createWebHistory } from "vue-router";
import AbilitiesView from "../views/AbilitiesView.vue";
import ColorsView from "../views/ColorsView.vue";
import HomeView from "../views/HomeView.vue";
import SkillsView from "../views/SkillsView.vue";
import TypesView from "../views/types/TypesView.vue";
import TypesAddView from "../views/types/TypesAddView.vue";
import TypesUpdateView from "../views/types/TypesUpdateView.vue";
import AddView from "../views/card/AddView.vue";
import CardsView from "../views/card/CardsView.vue";

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
      path: "/add-card",
      name: "addCard",
      component: AddView,
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
    {
      path: "/types",
      name: "types",
      component: TypesView,
    },
    {
      path: "/add/type",
      name: "addTypeView",
      component: TypesAddView,
    },
    {
      path: "/type/update/:id",
      name: "updateTypeView",
      component: TypesUpdateView,
    },
  ],
});

export default router;
