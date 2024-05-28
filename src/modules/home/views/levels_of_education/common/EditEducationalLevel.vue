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
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
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
                      >Editar nivel de educacion</DialogTitle
                    >
                    <div class="mt-4">
                      <label>
                        <span class="text-sm font-semibold text-gray-700"
                          >Nombre de nivel</span
                        >
                        <input
                          v-model="educationalLevelData.name"
                          type="text"
                          class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 mr-8 sm:ml-3 sm:w-auto"
                    @click="editeducationalLevel"
                  >
                    Editar nivel
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    @click="close"
                  >
                    Cancelar
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
  import { ref, defineEmits, watchEffect, watch } from "vue";
  import { useStore } from "vuex";
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  } from "@headlessui/vue";
  import {
    PlusCircleIcon,
    PencilIcon,
    XMarkIcon,
  } from "@heroicons/vue/24/outline";
  import { Toaster, toast } from "vue-sonner";
  
  const store = useStore();
  
  const editeducationalLevel = async () => {
    try {
      await store.dispatch("UPDATE_EDUCATION_LEVEL", {
        id: educationalLevelData.value.id,
        name: educationalLevelData.value.name,
      });
      close();
      toast.success("Nivel de educacion editado correctamente");
    } catch (error) {
      toast.error("Error al editar el nivel de educacion");
    }
  };
  
  const props = defineProps({
    open: {
      type: Boolean,
    },
    educationalLevel: {
      type: Object,
    },
  });
  
  const educationalLevelData = ref();
  
  watch(
    () => props.educationalLevel,
    (value) => {
      educationalLevelData.value = value;
    }
  );
  
  const emit = defineEmits(["close-edit"]);
  
  const close = () => emit("close-edit");
  </script>
  