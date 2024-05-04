<template>
    <div class="w-auto min-h-max" style="height:750px;">
      <l-map style="border-radius: 10px;"  ref="map" v-model:zoom="zoom" :center="[4.088143979468708, -72.9610683465866]">
        <l-tile-layer style="z-index: 0; position: absolute; width: 100%; height: 100%; "
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
      </l-map>
    </div>
  </template>

<script setup>
import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

const zoom = ref(6.555);
</script>

<style></style>
