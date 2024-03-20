import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "@/store";
import router from "./router/index.js";
import PrimeVue from "primevue/config";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(PrimeVue);
app.mount("#app");
