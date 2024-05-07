<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"
      >
        Ingresa en tu cuenta
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        class="space-y-6"
        action="#"
        @submit.prevent="loginUser"
        method="POST"
      >
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-white"
            >Correo electronico</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              v-model="userData.email"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-white"
              >Contraseña</label
            >
            <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-400 hover:text-indigo-300"
                >Olvidaste tu contraseña?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              v-model="userData.password"
              required=""
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Ingresar
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-400">
        No tienes cuenta?
        {{ " " }}
        <router-link
          to="/register"
          class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
          >Crea tu cuenta
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";

const router = useRouter();
const store = useStore();

const userData = ref({
  email: "",
  password: "",
});

const loginUser = async () => {
  const user = userData.value;
  try {
    await store.dispatch("VALIDATE_USER", { user });
    router.push({
      name: "Home",
    });
  } catch (err) {
    throw err;
  }
};

const toRegister = () => {
  router.push({
    name: "Register",
  });
};
</script>

<style></style>
