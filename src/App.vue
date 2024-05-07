<script setup>
import { Toaster, toast } from "vue-sonner";
</script>

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
