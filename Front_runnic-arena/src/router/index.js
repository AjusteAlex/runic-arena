import { createRouter, createWebHistory } from "vue-router";
import AbilitiesView from "../views/AbilitiesView.vue";
import ColorsView from "../views/ColorsView.vue";
import HomeView from "../views/HomeView.vue";

import TypesView from "../views/types/TypesView.vue";
import TypesAddView from "../views/types/TypesAddView.vue";
import TypesUpdateView from "../views/types/TypesUpdateView.vue";
import AddView from "../views/card/AddView.vue";
import CardsView from "../views/card/CardsView.vue";

import SkillsView from "../views/skills/SkillsView.vue";
import SkillsAddView from "../views/skills/SkillsAddView.vue";
import SkillsUpdateView from "../views/skills/SkillsUpdateView.vue";

import ClassessView from "../views/classes/ClassesView.vue";
import ClassesAddView from "../views/classes/ClassesAddView.vue";
import ClassessUpdateView from "../views/classes/ClassesUpdateView.vue";

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

    {
      path: "/skills",
      name: "skills",

      component: SkillsView,
    },
    {
      path: "/add/skill",
      name: "addSkillView",
      component: SkillsAddView,
    }, 
    {
      path: "/skill/update/:id",
      name: "updateSkillView",
      component: SkillsUpdateView,
    },

    {
      path: "/classes",
      name: "classes",
      component: ClassessView,
    },
    {
      path: "/add/classe",
      name: "addClassesView",
      component: ClassesAddView,
    }, 
    {
      path: "/classe/update/:id",
      name: "updateClasseView",
      component: ClassessUpdateView,
    },
  ],
});

export default router;
