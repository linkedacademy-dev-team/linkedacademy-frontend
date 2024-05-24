<template>
    <div class="w-full">
      <section name="filters">
        <div class="w-full flex flex-wrap gap-x-4 gap-y-2 justify-between">
          <div class="w-full sm:w-auto">
            <label
              for="slider"
              class="block text-base font-medium leading-6 text-white"
            >
              Zona
            </label>
            <Dropdown
              v-model="filters.selectedZone"
              :options="zones"
              optionLabel="zone"
              placeholder="Seleccione zona"
              class="w-full md:w-20rem"
              @change="updateFilters"
            />
          </div>
          <div class="w-full sm:w-auto">
            <label
              for="slider"
              class="block text-base font-medium leading-6 text-white"
            >
              Horario
            </label>
            <Dropdown
              v-model="filters.selectedSchedule"
              :options="schedule"
              optionLabel="schedule"
              placeholder="Seleccione horario"
              class="w-full md:w-20rem"
              @change="updateFilters"
            />
          </div>
          <div class="w-full sm:w-auto">
            <label
              for="slider"
              class="block text-base font-medium leading-6 text-white"
            >
              Tipo de institución
            </label>
            <Dropdown
              v-model="filters.typeofSchool"
              :options="typeofSchool"
              optionLabel="typeofSchool"
              placeholder="Seleccione tipo "
              class="w-full md:w-20rem"
              @change="updateFilters"
            />
          </div>
  
          <div class="w-full sm:w-auto">
            <label
              for="slider"
              class="block text-base font-medium leading-6 text-white"
            >
              Genero de la institución
            </label>
            <Dropdown
              v-model="filters.genderofSchool"
              :options="genderofSchool"
              optionLabel="genderofSchool"
              placeholder="Seleccione genero"
              class="w-full md:w-20rem"
              @change="updateFilters"
            />
          </div>
          <div class="w-full sm:w-auto">
            <label
              for="slider"
              class="block mb-4 text-base font-medium leading-6 text-white"
            >
              Estudiantes por clase : {{ sliderStudentsPerClass }}
            </label>
            <Slider
              :min="1"
              :max="50"
              :step="1"
              v-model="sliderStudentsPerClass"
              @change="updateSliderFilter"
            />
          </div>
          <div class="w-full sm:w-auto">
            <label
              for="slider"
              class="block text-base font-medium leading-6 text-white"
            >
              Otras facilidades </label
            ><MultiSelect
              v-model="selectedFacilities"
              :options="facilitiesOptions"
              optionLabel="name"
              optionValue="value"
              :maxSelectedLabels="1"
              placeholder="Seleccione facilidades"
              class="w-full md:w-20rem"
              @change="updateFacilities"
            />
          </div>
        </div>
        <div class="relative flex mb-16 sm:mb-0">
          <div class="absolute right-0">
            <Button
              @click="clearFilters"
              :class="{
                'bg-red-300 cursor-not-allowed': !areFiltersActive,
                'bg-red-400': areFiltersActive,
              }"
              class="w-40 h-10 mt-4 flex items-center my-auto text-white px-2 py-2"
              label="Limpiar filtros"
              severity="secondary"
              raised
            />
          </div>
        </div>
        <div class="sm:w-[30%] justify-between w-auto mt-10">
          <label
            for="slider"
            class="block mb-4 text-base font-medium leading-6 text-white"
          >
            Radio de búsqueda : {{ sliderValue }} km
          </label>
          <Slider
            @change="updateSliderFilter"
            :min="1"
            :max="10"
            :step="0.5"
            v-model="sliderValue"
          />
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
          <LCircle v-if="circleReady" :lat-lng="coordinates" :radius="sliderValue * 1000"></LCircle>
          <l-marker :icon="customIcon" :lat-lng="coordinates"></l-marker>
          <l-marker
            v-for="coord in visibleMarkers"
            :key="coord.id"
            :lat-lng="coord.coordinates"
            :icon="schoolIcon"
            ><LTooltip class="rounded p-2 " :direction="top">
              <div class="w-auto space-y-0.5 text-center h-auto flex-col">
                <div class="flex justify-center mx-auto">
                  <img
                    class="w-20 h-16 justify-center rounded items-center object-cover "
                    :src="
                      coord.image ||
                      'https://res.cloudinary.com/dkqaprz9w/image/upload/v1716540635/Colegio_bolivia_ch8tlt.jpg'
                    "
                    alt="school"
                  />
                </div>
                <h1 class="text-sm  font-semibold">🏫{{ coord.name }}</h1>
                <p class="text-xs">🔤{{ coord?.address }}</p>
                <p class="text-xs">📱{{ coord?.phone }}</p>
                <p class="text-xs">📧{{ coord?.email }}</p>
                <p class="text-xs">🚶‍♂️ {{ Number((coord?.distance).toFixed(2))  }} Km</p>
  
              </div>
            </LTooltip></l-marker
          >
        </l-map>
      </div>
    </div>
  </template>
  
  <script setup>
  import Button from "primevue/button";
  import Slider from "primevue/slider";
  import Checkbox from "primevue/checkbox";
  import Dropdown from "primevue/dropdown";
  import InputNumber from "primevue/inputnumber";
  import InputText from "primevue/inputtext";
  import MultiSelect from "primevue/multiselect";
  import { ref, watch, computed, watchEffect, onMounted } from "vue";
  import { useStore } from "vuex";
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
  import { LMap, LTileLayer, LCircle, LTooltip } from "@vue-leaflet/vue-leaflet";
  import { UserIcon } from "@heroicons/vue/20/solid";
  const sliderValue = ref(3);
  const zoom = ref();
  const store = useStore();
  const radius = 10;
  const circleReady = ref(false);
  
  const customIcon = L.icon({
    iconUrl: "https://img.icons8.com/3d-fluency/94/person-male--v6.png",
    iconSize: [40, 40], // Ajusta según sea necesario
    iconAnchor: [15, 30], // Ajusta según sea necesario
  });
  
  const schoolIcon = L.icon({
    iconUrl: "https://img.icons8.com/clouds/100/graduation-cap.png",
    iconSize: [40, 40], // Ajusta según sea necesario
    iconAnchor: [30, 20], // Ajusta según sea necesario
  });
  
  const filters = ref(
    {
      selectedZone: "",
    },
    {
      selectedSchedule: "",
    },
    {
      typeofSchool: "",
    },
    {
      genderofSchool: "",
    },
    {
      selectedFacilities: [],
    }
  );
  
  const typeofSchool = ref([
    {
      id: 1,
      typeofSchool: "Institución educativa",
    },
    {
      id: 2,
      typeofSchool: "Centro educativo",
    },
  ]);
  
  const genderofSchool = ref([
    {
      id: 1,
      genderofSchool: "Masculino",
    },
    {
      id: 2,
      genderofSchool: "Femenino",
    },
  ]);
  const schedule = ref([
    {
      id: 1,
      schedule: "A",
    },
    {
      id: 2,
      schedule: "B",
    },
    {
      id: 3,
      schedule: "C",
    },
  ]);
  
  const zones = ref([
    {
      id: 1,
      zone: "Urbana",
    },
    {
      id: 2,
      zone: "Rural",
    },
  ]);
  
  const sliderStudentsPerClass = ref(20);
  const selectedFacilities = ref([]);
  const facilitiesOptions = ref([
    { name: "Laboratorios", value: "laboratorios", selected: false },
    { name: "Librería", value: "libreria", selected: false },
    { name: "Internet", value: "internet", selected: false },
    { name: "Campo de futbol", value: "campo_futbol", selected: false },
    { name: "Campo de volleyball", value: "campo_volleyball", selected: false },
    { name: "Campo de basketball", value: "campo_basketball", selected: false },
    { name: "Piscina", value: "piscina", selected: false },
    { name: "Sala de computo", value: "sala_computo", selected: false },
    { name: "Transporte escolar", value: "transporte_escolar", selected: false },
    { name: "Restaurante", value: "restaurante", selected: false },
    { name: "Auditorio", value: "auditorio", selected: false },
    { name: "Area de almuerzo", value: "area_almuerzo", selected: false },
  ]);
  
  const updateFacilities = () => {
    facilitiesOptions.value.forEach((option) => {
      option.selected = selectedFacilities.value.includes(option.value);
    });
    updateFilters();
  };
  
  onMounted(async () => {
    await store.dispatch("GET_SCHOOLS");
  });
  
  let timer = null;
  
  const updateSliderFilter = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateFilters();
    }, 1000);
  };
  
  const updateFilters = () => {
    store.dispatch("UPDATE_SCHOOLS_FILTERS", {
      filters: {
        range: sliderValue.value,
        studentsPerClass: sliderStudentsPerClass.value,
        schedule: filters.value.selectedSchedule,
        zone: filters.value.selectedZone,
        typeofSchool: filters.value.type,
        genderofSchool: filters.value.genderofSchool,
        selectedFacilities: facilitiesOptions.value,
      },
    });
  };
  
  const clearFilters = () => {
    filters.value = {
      selectedZone: "",
      selectedSchedule: "",
      typeofSchool: "",
      genderofSchool: "",
      selectedFacilities: [],
    };
    sliderValue.value = 3;
    sliderStudentsPerClass.value = 20;
    selectedFacilities.value = [];
    updateFilters();
  };
  
  const areFiltersActive = computed(() => {
    return (
      filters.value.selectedZone ||
      filters.value.selectedSchedule ||
      filters.value.typeofSchool ||
      filters.value.genderofSchool ||
      selectedFacilities.value.length > 0 ||
      sliderValue.value !== 3 ||
      sliderStudentsPerClass.value !== 20
    );
  });
  
  const schools = ref([]);
  
  const coordinates = computed(() => store.state.geolocation.coordinates);
  const schoolsData = computed(() => store.state.schools.schools);
  
  watchEffect(() => {
    schools.value = schoolsData.value;
    circleReady.value = true;
  });
  
  const visibleMarkers = computed(() => {
    if (!coordinates.value || !schools.value || !schools.value.length) return [];
    const center = L.latLng(coordinates.value);
    return schools.value.filter((school) => {
      const point = L.latLng(school.coordinates);
      return center.distanceTo(point) <= sliderValue.value * 1000;
    });
  });
  
  watchEffect(() => {
    if (coordinates.value) {
      zoom.value = 15;
    } else {
      zoom.value = 6.55;
    }
  });
  
  const existCoordinates = computed(() => {
    return coordinates.value ? true : false;
  });
  </script>
  
  <style scoped>
  .p-dropdown {
    min-width: 200px;
  }
  </style>
  