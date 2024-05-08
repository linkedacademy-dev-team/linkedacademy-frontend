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
        class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white"
      >
        Crea tu cuenta
      </h2>
    </div>

    <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="first-name"
            class="block text-sm font-medium leading-6 text-white"
            >Nombres</label
          >
          <div class="mt-2 mb-4">
            <input
              id="first-name"
              name="first-name"
              type="first-name"
              autocomplete="first-name"
              required="true"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <label
            for="last-name"
            class="block text-sm font-medium leading-6 text-white"
          >
            Apellidos
          </label>
          <div class="mt-2 mb-4">
            <input
              id="last-name"
              name="last-name"
              type="last-name"
              autocomplete="last-name"
              required="true"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div class="mb-4">
            <label
              for="countries"
              class="block text-sm font-medium leading-6 text-white"
              >Pais</label
            >
            <select
              v-model="countrySelected"
              @change="getDepartments"
              id="countries"
              name="country"
              class="mt-2 block w-full bg-white/5 rounded-md border-0 py-1.5 pl-3 pr-10 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              >
              <option selected disabled value="">Seleccione un pais</option>
              <option
                v-for="country in countries"
                :key="country.id"
                :value="country.id"
                class="text-gray-500"
              >
                {{ country.name }}
              </option>
            </select>
          </div>
          <div
            v-if="countrySelected"
            class="mt-2 mb-4 animate-fade transition ease-in-out delay-200 gap-x-4 flex flex-row"
          >
            <div :class="departmentSelected ? 'w-[50%]' : ' w-full'" class="">
              <label
                for="departments"
                class="block text-sm font-medium leading-6 text-white"
                >Departamento</label
              >
              <select
                @change="getCities"
                v-model="departmentSelected"
                id="departments"
                name="department"
                class="mt-2 block w-full bg-white/5 rounded-md border-0 py-1.5 pl-3 pr-10 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option selected disabled value="">
                  Seleccione un departamento
                </option>
                <option
                  v-for="department in departments"
                  :key="department.id"
                  :value="department.id"
                  class="text-gray-500"
                >
                  {{ department.name }}
                </option>
              </select>
            </div>
            <div :class="{ hidden: !departmentSelected }" class="w-[50%]">
              <label
                for="cities"
                class="block text-sm font-medium leading-6 text-white"
                >Ciudad</label
              >
              <select
                v-model="citySelected"
                id="cities"
                name="citiy"
                class="mt-2 block w-full bg-white/5 rounded-md border-0 py-1.5 pl-3 pr-10 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option selected disabled value="">
                  Seleccione una ciudad
                </option>
                <option
                  v-for="city in cities"
                  :key="city.id"
                  :value="city.id"
                  class="text-gray-500"
                >
                  {{ city.name }}
                </option>
              </select>
            </div>
          </div>
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
              required="true"
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
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required="true"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Registrarse
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-400">
        Ya tienes una cuenta?
        {{ " " }}
        <router-link
          to="/"
          class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
          >Ingresa con tu cuenta
        </router-link>
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

onMounted(() => {
  store.dispatch("GET_COUNTRIES");
});

const userData = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
});

const countrySelected = ref(null);
const departmentSelected = ref(null);
const citySelected = ref(null);
const countries = computed(() => store.state.countries);
const departments = computed(() => store.state.departments);
const cities = computed(() => store.state.cities);

const getDepartments = () => {
  try {
    store.dispatch("GET_DEPARTMENTS", countrySelected.value);
  } catch (e) {
    throw e;
  }
};

const getCities = () => {
  try {
    store.dispatch("GET_CITIES", departmentSelected.value);
  } catch (e) {
    throw e;
  }
};
</script>
