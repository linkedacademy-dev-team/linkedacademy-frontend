<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute left-full top-0 flex w-16 justify-center pt-5"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10"
              >
                <div class="flex h-16 shrink-0 items-center">
                  <img
                    class="h-8 w-auto"
                    src="https://res.cloudinary.com/dkqaprz9w/image/upload/v1716533698/icons8-map-marker-100_fsvoae.png"
                    alt="Your Company"
                  />
                  <div>
                    <h1 class="font-semibold ml-4 text-lg text-white">
                      Linked Academy
                    </h1>
                  </div>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <router-link
                            :to="{ name: item.href }"
                            :class="[
                              item.current
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                            ]"
                          >
                            <component
                              :is="item.icon"
                              class="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {{ item.name }}
                          </router-link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4"
      >
        <div class="flex h-16 shrink-0 items-center">
          <img
            class="h-8 w-auto"
            src="https://res.cloudinary.com/dkqaprz9w/image/upload/v1716533698/icons8-map-marker-100_fsvoae.png"
            alt="Your Company"
          />
          <div>
            <h1 class="font-semibold ml-4 text-lg text-white">
              Linked Academy
            </h1>
          </div>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <router-link
                    :to="{ name: item.href }"
                    :class="[
                      item.current
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      class="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
      <div
        class="sticky bg-gray-800 top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-600 bg-gray px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <button
          type="button"
          class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="h-6 w-px lg:hidden" />
        <div class="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <button
              type="button"
              class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <!-- <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" /> -->
            </button>
            <div
              class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              aria-hidden="true"
            />
            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full bg-gray-50"
                  src="https://res.cloudinary.com/dkqaprz9w/image/upload/v1716533698/icons8-map-marker-100_fsvoae.png"
                  alt=""
                />
                <span class="hidden lg:flex lg:items-center">
                  <span
                    class="ml-4 text-sm font-semibold leading-6 text-white"
                    aria-hidden="true"
                    >{{ userData?.firstName + " "
                    }}{{ userData?.lastName }}</span
                  >
                  <ChevronDownIcon
                    class="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                    class="hover:bg-gray-300"
                  >
                    <span
                      v-on:click="item.actions"
                      :class="[
                        active ? 'bg-gray-50' : '',
                        'block cursor-pointer hover:text-blue-500 px-3 py-1 text-sm leading-6 text-gray-900',
                      ]"
                      >{{ item.name }}</span
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="min-h-full">
            <router-view />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  HomeModernIcon,
  LightBulbIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  RectangleStackIcon,
  SparklesIcon,
  UsersIcon,
  LanguageIcon,
  HomeIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/outline";

const store = useStore();
const router = useRouter();
const route = useRoute();
const sidebarOpen = ref(false);

onMounted(() => {
  store.dispatch("GET_USER");
});

const userData = computed(() => store.state.userData);

const navigation = ref([
  { name: "Home", href: "Home", icon: HomeIcon, current: false },
  { name: "Colegios", href: "Schools", icon: HomeModernIcon, current: false },
  {
    name: "Especialidad",
    href: "Specialties",
    icon: LightBulbIcon,
    current: false,
  },
  { name: "Jornadas", href: "Schedule", icon: CalendarIcon, current: false },
  {
    name: "Modelos educativos",
    href: "Educational_Models",
    icon: ChartPieIcon,
    current: false,
  },
  {
    name: "Niveles de educacion",
    href: "EducationalLevels",
    icon: RectangleStackIcon,
    current: false,
  },
  {
    name: "Discapacidades",
    href: "Disabilities",
    icon: SparklesIcon,
    current: false,
  },
  {
    name: "Grupos etnicos",
    href: "Ethnicities",
    icon: UsersIcon,
    current: false,
  },
  { name: "Idiomas", href: "Languages", icon: LanguageIcon, current: false },
]);

const userNavigation = [
  { name: "Tu perfil", actions: () => router.push({ name: "Profile" }) },
  {
    name: "Cerrar sesion",
    actions: () => {
      store.dispatch("LOGOUT");
      router.push({ name: "Login" });
    },
  },
];

watchEffect(() => {
  navigation.value.forEach((item) => {
    item.current = route.name === item.href;
  });
});
</script>
