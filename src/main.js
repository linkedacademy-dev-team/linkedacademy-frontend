import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "@/store";
import router from "./router/index.js";
import PrimeVue from "primevue/config";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const app = createApp(App);

app.use(store);
app.component("l-map", LMap);
app.component("l-tite-layer", LTileLayer);
app.component("l-marker", LMarker);
app.use(router);
app.use(PrimeVue);
app.mount("#app");
