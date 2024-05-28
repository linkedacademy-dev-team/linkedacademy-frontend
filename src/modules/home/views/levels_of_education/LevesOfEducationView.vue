<template>
  <div class="bg-gray-900 rounded">
    <div class="mx-auto max-w-7xl">
      <div class="bg-gray-900 py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold leading-6 text-white">
                Niveles de educación
              </h1>
              <p class="mt-2 text-sm text-gray-300">
                Una lista de niveles de educación.
              </p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                @click="openAddLevel"
                type="button"
                class="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Añadir nivel educativo
              </button>
            </div>
          </div>
          <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
              >
                <table class="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Creado
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Modificado
                      </th>

                      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-800">
                    <tr
                      v-for="educationalLevel in educationalLevelsData"
                      :key="educationalLevel.id"
                    >
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
                      >
                        {{ educationalLevel?.name }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                      >
                        {{ educationalLevel?.createdAt }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                      >
                        {{ educationalLevel.updatedAt }}
                      </td>
                      <td
                        class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                      >
                        <div class="text-indigo-400 hover:text-indigo-300">
                          <span class="flex flex-grow space-x-4"
                            ><button @click="openEditLevel(educationalLevel)">
                              <PencilSquareIcon class="w-6 h-6" />
                            </button>
                            <button
                              @click="deleteEducationalLevel(educationalLevel.id)"
                            >
                              <TrashIcon class="w-6 h-6" />
                            </button>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddEducationalLevel :open="addLevel" @close-add="closeAddLevel" />

  <EditEducationalLevel
    :open="editLevel"
    @close-edit="closeEditLevel"
    :educationalLevel="levelSelected"
  />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/20/solid";
import AddEducationalLevel from "./common/addEducationalLevel.vue";
import EditEducationalLevel from "./common/EditEducationalLevel.vue";

const store = useStore();

const addLevel = ref(false);
const editLevel = ref(false);
const levelSelected = ref(null);

const openAddLevel = () => {
  addLevel.value = true;
};
const closeAddLevel = () => {
  addLevel.value = false;
};

const openEditLevel = (educationalLevel) => {
  levelSelected.value = educationalLevel;
  editLevel.value = true;
};
const closeEditLevel = () => {
  editLevel.value = false;
};

const deleteEducationalLevel = async (id) => {
  try{
    await store.dispatch("DELETE_EDUCATION_LEVEL", id);
    await store.dispatch("GET_EDUCATION_LEVELS");
  } catch (error) {
    console.log(error);
  }
  
};

const educationalLevelsData = computed(() => store.state.education_levels);

onMounted(async () => {
  await store.dispatch("GET_EDUCATION_LEVELS");
});
</script>
