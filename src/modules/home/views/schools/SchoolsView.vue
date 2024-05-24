<template>
  <div class="bg-gray-900 rounded">
    <div class="mx-auto max-w-7xl">
      <div class="bg-gray-900 py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold leading-6 text-white">
                Colegios
              </h1>
              <p class="mt-2 text-sm text-gray-300">Una lista de colegios.</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                @click="openNewSchool"
                type="button"
                class="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Añadir colegio
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
                        Email
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Direccion
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Phone
                      </th>

                      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-800">
                    <tr v-for="school in schoolsData" :key="school.id">
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
                      >
                        {{ school?.name }}
                      </td>
                      <td
                        class="whitespace-nowrap break-words px-3 py-4 text-sm text-gray-300"
                      >
                        {{ school?.address }}
                      </td>
                      <td
                        class="whitespace-nowrap break-words px-3 py-4 text-sm text-gray-300"
                      >
                        {{ school?.email }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                      >
                        {{ school?.phone }}
                      </td>
                      <td
                        class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                      >
                        <div class="text-indigo-400 ">
                          <span class="flex flex-grow space-x-4"
                            ><button class="hover:text-indigo-300" @click="openEditSchool(school)">
                              <PencilSquareIcon class="w-6 h-6" />
                            </button>
                            <button class="hover:text-indigo-300" @click="deleteSpecialitie(school.id)">
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
          <nav
            class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
          >
            <div class="-mt-px flex w-0 flex-1">
              <button
                @click="getPreviousPage"
                class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <ArrowLongLeftIcon
                  class="mr-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Anterior
              </button>
            </div>
            <div class="hidden md:-mt-px md:flex">
              <div v-for="index in paginationData?.totalPages" :key="index">
                <button @click="getMoreSchools(index)">
                  <span
                    :class="
                      index === paginationData?.page
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    "
                    class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    {{ index }}
                  </span>
                </button>
              </div>
            </div>
            <div class="-mt-px flex w-0 flex-1 justify-end">
              <button
                @click="getNextPage"
                class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Siguiente
                <ArrowLongRightIcon
                  class="ml-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <addNewSchool :open="addNewSchoolModal" @close-add="closeNewSchool" />
  <editSchoolsParameter
    :open="editSchoolModal"
    @close-edit="closeEditSchool"
    :school="schoolData"
  />
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { useStore } from "vuex";
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/20/solid";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/vue/20/solid";
import editSchoolsParameter from "./common/editSchoolParameter.vue";
import addNewSchool from "./common/addNewSchool.vue";

const store = useStore();

const schoolsData = computed(() => store.state.schooldsByCity.schools);
const paginationData = computed(() => store.state.schooldsByCity.pagination);
const cityId = computed(() => store.state.userData.cityId);

const currentPage = ref();
const addNewSchoolModal = ref(false);
const editSchoolModal = ref(false);
const schoolData = ref({});

const openNewSchool = () => {
  addNewSchoolModal.value = true;
};

const closeNewSchool = () => {
  addNewSchoolModal.value = false;
};

const openEditSchool = (school) => {
  console.log(school)
  editSchoolModal.value = true;
  schoolData.value = school;
};
const closeEditSchool = () => {
  editSchoolModal.value = false;
};

watch(paginationData, (newValue) => {
  currentPage.value = newValue.page;
});

const getMoreSchools = async (page) => {
  const payload = { cityId: cityId.value, page: page };
  await store.dispatch("GET_MORE_SCHOOLS_BY_ID_CITY", payload);
};

const getSchools = async () => {
  const payload = { cityId: cityId.value, page: currentPage.value };
  await store.dispatch("GET_SCHOOLS_BY_ID_CITY", payload);
};

const getNextPage = async () => {
  if (paginationData.value.hasNext) {
    currentPage.value = currentPage.value + 1;
    await getMoreSchools(currentPage.value);
  }
};

const getPreviousPage = async () => {
  if (paginationData.value.hasPrevious) {
    currentPage.value = currentPage.value - 1;
    await getMoreSchools(currentPage.value);
  }
};

const getAllRelationsContentInfo = async () => {
  await store.dispatch("GET_SPECIALITIES");
};



onMounted(async () => {
  await nextTick();
  await store.dispatch("GET_USER");
  await getSchools();
});
</script>
