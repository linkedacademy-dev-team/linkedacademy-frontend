<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full justify-center p-4 text-center items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="close"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <PencilIcon
                    class="h-6 w-6 text-blue-500"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-base mt-2 font-semibold leading-6 text-gray-900"
                  >
                    Editar parametros de la institucion
                  </DialogTitle>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label>
                        <span class="text-sm font-semibold text-gray-700"
                          >Nombre de la institucion</span
                        >
                      </label>
                      <input
                        :readonly="true"
                        v-model="schoolsData.name"
                        type="text"
                        :class="{
                          'bg-gray-200': true,
                          'cursor-not-allowed': true,
                        }"
                        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div class="flex mt-4 items-center mx-auto text-sm">
                    <label for="tabs" class="text-sm text-gray-700"
                      >Selecciona parametro</label
                    >
                    <select
                      v-model="relations"
                      id="tabs"
                      name="tabs"
                      class="block text-sm w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option disabled selected>Seleccione parametro</option>
                      <option
                        v-for="tab in tabs"
                        :key="tab.name"
                        :value="tab.value"
                      >
                        {{ tab.name }}
                      </option>
                    </select>
                  </div>
                  <div class="mt-4 space-y-4">
                    <div
                      v-for="param in paramsData"
                      :key="param.id"
                      class="flex justify-between items-center"
                    >
                      <div>
                        <label
                          :for="param.id"
                          class="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {{ param.name }}
                        </label>
                      </div>
                      <div>
                        <label class="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            :id="param.id"
                            v-model="param.active"
                            class="sr-only peer"
                            @change="activeDescativeParams(param)"
                          />
                          <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                          ></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, defineEmits, watch, computed } from "vue";
import { useStore } from "vuex";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { PencilIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { Toaster, toast } from "vue-sonner";

const store = useStore();
const relations = ref();
const relationsData = computed(() => store.state.relations);
const paramsData = ref([]);
const switchesState = ref({});
const relationId = ref();

const tabs = [
  {
    name: "Especialidades",
    current: false,
    value: "specialities",
    rute: "GET_SPECIALITIES",
  },
  {
    name: "Discapacidades",
    current: false,
    value: "disabilities",
    rute: "GET_DISABILITIES",
  },
  {
    name: "Grupos etnicos",
    current: true,
    value: "ethnicGroups",
    rute: "GET_ETHNIC_GROUPS",
  },
  {
    name: "Niveles de educacion",
    current: false,
    value: "educationLevels",
    rute: "GET_EDUCATION_LEVELS",
  },
  {
    name: "Modelos de educacion",
    current: false,
    value: "educationModes",
    rute: "GET_EDUCATIONAL_MODELS",
  },
  {
    name: "Lenguajes",
    current: false,
    value: "languages",
    rute: "GET_LANGUAGES",
  },
  { name: "Sesion", current: false, value: "session", rute: "GET_SESSIONS" },
];

const editSpecialitie = async () => {
  try {
    await store.dispatch("UPDATE_SPECIALITY", {
      id: schoolsData.value.id,
      name: schoolsData.value.name,
    });
    close();
    toast.success("Especialidad editada correctamente");
  } catch (error) {
    toast.error("Error al editar la especialidad");
  }
};

const getRelations = async () => {
  const selectedTab = tabs.find((tab) => tab.value === relations.value);
  if (selectedTab) {
    try {
      await store.dispatch("GET_SCHOOL_ADITIONAL_INFO", {
        relation: relations.value,
        schoolId: schoolsData.value.id,
      });
      const response = await store.dispatch(selectedTab.rute, {
        schoolId: schoolsData.value.id,
      });
      paramsData.value = response;
      console.log(response);
      paramsData.value.forEach((param) => {
        param.active = relationsData.value.some(
          (relation) => relation.id === param.id
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
};
watch(relations, (newVal) => {
  if (newVal) {
    const selectedRelation = relationsData.value.find(
      (relation) => relation.value === newVal
    );
    if (selectedRelation) {
      relationId.value = selectedRelation.id;
      console.log(relationId.value);
    }
  }
});

const activeDescativeParams = async (param) => {
  const payload = {
    active: param.active ? 1 : 0,
    relationId: param.id,
    schoolId: schoolsData.value.id,
    relation: relations.value,
  };
  console.log(payload);
  try {
    await store.dispatch("PUT_ACTIVE_DESACTIVE_PARAMETER", { payload });
  } catch (error) {
    console.log(error);
  }
};

watch(relations, (newVal) => {
  if (newVal) {
    getRelations();
  }
});

const props = defineProps({
  open: {
    type: Boolean,
  },
  school: {
    type: Object,
  },
});

const schoolsData = ref();

watch(
  () => props.school,
  (value) => {
    schoolsData.value = value;
  }
);

const emit = defineEmits(["close-edit"]);

const close = () => emit("close-edit");
</script>
