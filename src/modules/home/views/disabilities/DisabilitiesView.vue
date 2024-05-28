<template>
  <div class="bg-gray-900 rounded">
    <div class="mx-auto max-w-7xl">
      <div class="bg-gray-900 py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold leading-6 text-white">
                Discapacidades
              </h1>
              <p class="mt-2 text-sm text-gray-300">
                Una lista de discapacidades.
              </p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                @click="openAddDisabilities"
                type="button"
                class="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Añadir discapacidad
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
                      v-for="disabilities in disabilitiesData"
                      :key="disabilities.id"
                    >
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
                      >
                        {{ disabilities?.name }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                      >
                        {{ disabilities?.createdAt }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                      >
                        {{ disabilities.updatedAt }}
                      </td>
                      <td
                        class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                      >
                        <div class="text-indigo-400">
                          <span class="flex flex-grow space-x-4"
                            ><button
                              class="hover:text-indigo-300"
                              @click="openEditSpecialities(disabilities)"
                            >
                              <PencilSquareIcon class="w-6 h-6" />
                            </button>
                            <button
                              class="hover:text-indigo-300"
                              @click="deleteSpecialitie(disabilities.id)"
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
  <AddDisabilities :open="addDisabilities" @close-add="closeAddDisabilities" />
  <EditDisabilities
    :open="editDisabilities"
    :disabilities="disabilitieSelected"
    @close-edit="closeEditDisabilities"
  />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/20/solid";
import AddDisabilities from "./common/AddDisabilities.vue";
import EditDisabilities from "./common/EditDisabilities.vue";

const store = useStore();

const addDisabilities = ref(false);
const editDisabilities = ref(false);
const disabilitieSelected = ref(null);

const openAddDisabilities = () => {
  addDisabilities.value = true;
};
const closeAddDisabilities = () => {
  addDisabilities.value = false;
};
const closeEditDisabilities = () => {
  editDisabilities.value = false;
};

const openEditSpecialities = (specialities) => {
  disabilitieSelected.value = specialities;
  editDisabilities.value = true;
};
const deleteSpecialitie = async (id) => {
  try {
    await store.dispatch("DELETE_DISABILITY", id);
    await store.dispatch("GET_DISABILITIES");
  } catch (error) {
    console.log(error);
  }
};

const disabilitiesData = computed(() => store.state.disabilities);

onMounted(async () => {
  await store.dispatch("GET_DISABILITIES");
});
</script>
