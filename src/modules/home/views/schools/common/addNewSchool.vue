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
          class="flex min-h-full  justify-center p-4 text-center items-center sm:p-0"
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
                  <span class="text-2xl">🏫</span>
                </div>

                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-base mt-2 font-semibold leading-6 text-gray-900"
                    >Crear institucion
                  </DialogTitle>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label>
                        <span class="text-sm font-semibold text-gray-700"
                          >Nombre de la institucion</span
                        >
                      </label>

                      <input
                        placeholder="Nombre de la institucion"
                        v-model="schoolsData.name"
                        type="text"
                        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label>
                        <span class="text-sm font-semibold text-gray-700"
                          >Email de la institucion</span
                        >
                      </label>
                      <input
                        v-model="schoolsData.email"
                        placeholder="example@email.com"
                        type="email"
                        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label>
                        <span class="text-sm font-semibold text-gray-700"
                          >Sede</span
                        >
                      </label>
                      <SelectButton
                        v-model="provisional"
                        :options="isPrincipaly"
                        optionLabel="name"
                        optionValue="id"
                        placeholder="Seleccione una sede"
                        class="w-full mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 mr-8 sm:ml-3 sm:w-auto"
                  @click="createSchool"
                >
                  Crear institucion
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, defineEmits, watch, computed, watchEffect } from "vue";
import SelectButton from "primevue/selectbutton";
import { useStore } from "vuex";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { Toaster, toast } from "vue-sonner";

const store = useStore();
const educationalModelName = ref("");

const provisional = ref("");

const schoolsData = ref({
  name: "",
  logo: "https://losmejorescolegios.com/co/wp-content/uploads/sites/12/2023/10/col-neil.jpg.webp",
  cityId: "",
  schoolParenId: null ? 1 : null,
  email: "",
  coordinates: null,
});

const cityId = computed(() => store.state.schooldsByCity.cityId);


watch(cityId, async (cityId) => {
  schoolsData.value.cityId = cityId;
});

const createSchool = async () => {
  try {
    if (schoolsData.value.name === "") {
      toast.error("Por favor ingrese el nombre de la institucion");
      return;
    }
    if (schoolsData.value.email === "") {
      toast.error("Por favor ingrese el email de la institucion");
      return;
    }
    await store.dispatch("CREATE_SCHOOL", schoolsData.value);
  } catch (error) {
    console.log(error);
  }
};

const isPrincipaly = ref([
  {
    id: 1,
    name: "Principal",
  },
  {
    id: 2,
    name: "No Principal ",
  },
]);

defineProps({
  open: Boolean,
});

const emit = defineEmits(["close-add"]);

const close = () => emit("close-add");
</script>

<style scoped>
:deep(.p-selectbutton .p-button) {
  background: #e5f0fa;
  border: 1px solid #f1f5f9;
  color: #64748b;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s, outline-color 0.2s;
}

:deep(.p-selectbutton .p-button.p-highlight::before) {
  background: #6366f1;
  border-color: #ffffff;
  color: #ffffff;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.02),
    0px 1px 2px 0px rgba(0, 0, 0, 0.04);
}
:deep(.p-selectbutton .p-button .p-button-label) {
  font-size: 14px;
}

:deep(.p-selectbutton .p-button.p-highlight .p-button-label) {
  color: #ffffff;
  font-size: 14px;
}
</style>
