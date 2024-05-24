<template>
  <div class="min-h-screen flex">
    <div class="flex-1 flex flex-col">
      <div class="flex-1 overflow-y-auto">
        <div class="p-4 py-0">
          <div class="w-full h-auto bg-indigo-900 rounded-lg flex flex-grow">
            <img
              class="w-auto h-auto"
              src="https://res.cloudinary.com/dkqaprz9w/image/upload/v1716532880/icons8-user-location-100_m4kjuw.png"
            />
            <div class="flex flex-col justify-center">
              <h1 class="text-xl text-white font-medium">
                Bienvenido, {{ userData?.firstName + " "
                }}{{ userData?.lastName }}
              </h1>
              <h2 class="text-lg text-white font-medium">
                ¿Qué deseas hacer hoy?
              </h2>
            </div>
          </div>
          <div class="mt-6">
            <HomeMap />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import HomeMap from "./common/HomeMap.vue";

const store = useStore();
const router = useRouter();

onMounted(() => {
  store.dispatch("GET_USER");
});

const userData = computed(() => store.state.userData);
</script>

<style></style>
