import { library } from "@fortawesome/fontawesome-svg-core";
import { createApp } from "vue";

import {
  faCircleInfo,
  faDragon,
  faFire,
  faGear,
  faHouse,
  faPen,
  faPeopleGroup,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import Menu from "./components/general/menu.vue";
import router from "./router";

// Font awesome adding icons
library.add(faHouse);
library.add(faPlus);
library.add(faGear);
library.add(faPen);
library.add(faTrash);
library.add(faXmark);
library.add(faPeopleGroup);
library.add(faFire);
library.add(faDragon);
library.add(faCircleInfo);
createApp(App)
  .component("Menu", Menu)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
