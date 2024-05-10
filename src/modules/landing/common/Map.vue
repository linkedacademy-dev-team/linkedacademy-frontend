<template>
  <div class="w-full">
    <section name="filters">
      {{ coordinates }}
      <div class="w-full space-y-2">
        <div class="max-w-[20%] space-y-4">
          <label
            for="slider"
            class="block text-base font-medium leading-6 text-white"
          >
            Radio de búsqueda
          </label>
          <Slider :min="1" :max="10" :step="1" v-model="sliderValue" />
        </div>
      </div>
    </section>
    <div class="mt-10 w-auto min-h-max" style="height: 750px">
      <l-map
        style="border-radius: 10px"
        ref="map"
        v-model:zoom="zoom"
        :center="coordinates || [4.088143979468708, -72.9610683465866]"
      >
        <l-tile-layer
          style="z-index: 0; position: absolute; width: 100%; height: 100%"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <LCircle :lat-lng="coordinates" :radius="sliderValue * 1000"></LCircle>
        <l-marker :icon="customIcon" :lat-lng="coordinates"
          ><LTooltip></LTooltip
        ></l-marker>
        <l-marker
          v-for="coord in visibleMarkers"
          :key="coord.id"
          :lat-lng="coord.coordinates"
          :icon="schoolIcon"
          ><LTooltip></LTooltip
        ></l-marker>
      </l-map>
    </div>
  </div>
</template>

<script setup>
import Slider from "primevue/slider";
import { ref, watch, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LMap, LTileLayer, LCircle, LTooltip } from "@vue-leaflet/vue-leaflet";
import { UserIcon } from "@heroicons/vue/20/solid";
const sliderValue = ref(2);
const zoom = ref();
const store = useStore();
const radius = 10;

const customIcon = L.icon({
  iconUrl: "https://img.icons8.com/3d-fluency/94/person-male--v6.png",
  iconSize: [50, 50], // Ajusta según sea necesario
  iconAnchor: [15, 30], // Ajusta según sea necesario
});

const schoolIcon = L.icon({
  iconUrl: "https://img.icons8.com/clouds/100/graduation-cap.png",
  iconSize: [50, 50], // Ajusta según sea necesario
  iconAnchor: [15, 30], // Ajusta según sea necesario
});

const visibleMarkers = computed(() => {
  if (!coordinates.value) return [];
  const center = L.latLng(coordinates.value);
  return testCoordinates.filter((coord) => {
    const point = L.latLng(coord.coordinates);
    return center.distanceTo(point) <= sliderValue.value * 1000; // Convierte km a metros
  });
});

const testCoordinates = [
  {
    id: 2,
    coordinates: [4.124839, -73.60955], // 1 km al norte
  },
  {
    id: 3,
    coordinates: [4.106821, -73.60955], // 1 km al sur
  },
  {
    id: 4,
    coordinates: [4.11583, -73.60053], // 1 km al este
  },
  {
    id: 5,
    coordinates: [4.11583, -73.61857], // 1 km al oeste
  },
  {
    id: 6,
    coordinates: [4.133848, -73.60955], // 2 km al norte
  },
  {
    id: 7,
    coordinates: [4.097812, -73.60955], // 2 km al sur
  },
  {
    id: 8,
    coordinates: [4.11583, -73.59151], // 2 km al este
  },
  {
    id: 9,
    coordinates: [4.11583, -73.62759], // 2 km al oeste
  },
  {
    id: 10,
    coordinates: [4.142857, -73.60955], // 3 km al norte
  },
  {
    id: 11,
    coordinates: [4.088803, -73.60955], // 3 km al sur
  },
  {
    id: 12,
    coordinates: [4.11583, -73.58249], // 3 km al este
  },
  {
    id: 13,
    coordinates: [4.11583, -73.63661], // 3 km al oeste
  },
];

const coordinates = computed(() => store.state.geolocation.coordinates);

watchEffect(() => {
  if (coordinates.value) {
    zoom.value = 15; // Si existen coordenadas, sumamos 20 al valor del slider
  } else {
    zoom.value = 6.55; // Si no, solo usamos el valor del slider
  }
});

const existCoordinates = computed(() => {
  return coordinates.value ? true : false;
});
</script>

<style></style>
