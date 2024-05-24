<template>
  <div id="app">
    <Toaster
      rich-colors=""
      position="top-right"
      :close-button="true"
      :duration="1400"
    />
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap");
* {
  font-family: Poppins, Helvetica, Arial, sans-serif;
}
</style>

<script setup>
import { Toaster, toast } from "vue-sonner";
import { onMounted } from "vue";
import { useStore } from "vuex";

onMounted(() => {
  getUbication();
});

const store = useStore();

const getUbication = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coordinates = [pos.coords.latitude, pos.coords.longitude];
        store.commit("SET_GEOLOCATION", { coordinates });
      },
      (err) => {
        console.log(err);
      },
      { enableHighAccuracy: true, timeout: 9999999999999, maximumAge: 0 }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};
</script>
