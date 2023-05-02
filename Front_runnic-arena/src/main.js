import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Menu from './components/general/menu.vue';

createApp(App)
    .component('Menu', Menu)
    .use(router).mount("#app");
