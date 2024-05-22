<template>
  <div class="bg-gray-900 rounded">
    <div class="mx-auto max-w-7xl">
      <div class="bg-gray-900 py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold leading-6 text-white">
                Grupos etnicos
              </h1>
              <p class="mt-2 text-sm text-gray-300">
                Una lista de grupos etnicos.
              </p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                class="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Añadir grupo etnico
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
                    <tr v-for="person in people" :key="person.email">
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
                      >
                        {{ person.name }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                      >
                        {{ person.title }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                      >
                        {{ person.email }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                      >
                        {{ person.role }}
                      </td>
                      <td
                        class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                      >
                      <div class="text-indigo-400 hover:text-indigo-300">
                          <span class="flex flex-grow space-x-4"
                            ><button
                              @click="openEditSpecialities(specialities)"
                            >
                              <PencilSquareIcon class="w-6 h-6" />
                            </button>
                            <button @click="deleteSpecialitie(specialities.id)">
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
</template>

<script setup>
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/20/solid";
const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];
</script>
