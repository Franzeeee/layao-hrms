<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const isOpen = ref(false)
const isSticky = ref(false)
const router = useRouter()

// Menu items array
const menuItems = [
  { label: 'Home', to: '/', routeNames: ['home'] },
  { label: 'Rooms', to: '/rooms', routeNames: ['rooms', 'room-details'] },
  { label: 'Book', to: '#', routeNames: [] },
  { label: 'Gallery', to: '#', routeNames: [] },
  { label: 'Blog', to: '#', routeNames: [] },
  { label: 'Contact', to: '#', routeNames: [] },
]

// Watch scroll position
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  isSticky.value = window.scrollY > 200
}

function lineClasses(index: number) {
  const base = 'block bg-primary-color-1 transition-transform duration-300 h-[2.3px]'
  if (index === 1) {
    return isOpen.value ? base + ' translate-y-2 rotate-45' : base + ' translate-y-0'
  }
  if (index === 2) {
    return isOpen.value ? base + ' scale-x-0' : base + ' scale-x-100'
  }
  if (index === 3) {
    return isOpen.value ? base + ' -translate-y-2 -rotate-45' : base + ' translate-y-0'
  }
}
</script>

<template>
  <div
    :class="[
      'w-full flex items-center justify-center shadow transition-all duration-300 ease-in-out',
      isSticky ? 'fixed top-0 bg-white z-50' : 'relative',
    ]"
  >
    <div
      class="max-w-[1110px] w-full h-15 flex flex-col justify-center items-start px-4 md:px-8 p-2 lg:flex-row lg:items-center lg:py-0 lg:px-12 xl:px-3 text-black"
    >
      <!-- Desktop nav -->
      <div class="w-full hidden lg:flex">
        <ul class="flex items-center justify-start gap-2 uppercase text-sm">
          <li v-for="item in menuItems" :key="item.label" class="p-5">
            <router-link
              v-if="item.to !== '#'"
              :to="item.to"
              class="transition-colors duration-200"
              :class="[
                'hover:text-[#c4a164]',
                item.routeNames.includes(String(router.currentRoute.value.name ?? ''))
                  ? 'text-[#c4a164] font-semibold'
                  : '',
              ]"
            >
              {{ item.label }}
            </router-link>
            <a v-else href="#" class="transition-colors duration-200 hover:text-[#c4a164]">
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Hamburger button (mobile) -->
      <button
        @click="isOpen = !isOpen"
        class="lg:hidden flex flex-col justify-around h-10 w-10 p-2 group"
      >
        <span :class="lineClasses(1)"></span>
        <span :class="lineClasses(2)"></span>
        <span :class="lineClasses(3)"></span>
      </button>

      <!-- Social icons -->
      <div
        class="min-w-24 flex gap-4 p-1 transition-all duration-500 ease-linear absolute right-0 bottom-6 lg:static md:mr-5 lg:bottom-3 mr-4"
      >
        <i class="fa-brands fa-facebook-f text-sm text-gray-400"></i>
        <i class="fa-brands fa-x-twitter text-sm text-gray-400"></i>
        <i class="fa-solid fa-envelope text-sm text-gray-400"></i>
      </div>
    </div>

    <!-- Mobile nav overlay -->
    <div
      :class="[
        'absolute left-0 top-full w-full bg-white overflow-hidden shadow transition-[max-height] duration-300 ease-in-out lg:hidden z-50',
        isOpen ? 'max-h-[400px] pb-3' : 'max-h-0',
      ]"
    >
      <nav class="flex flex-col items-start px-4 md:px-8">
        <template v-for="item in menuItems" :key="item.label">
          <router-link
            v-if="item.to !== '#'"
            :to="item.to"
            class="block py-4 w-full"
            @click="isOpen = false"
          >
            {{ item.label }}
          </router-link>
          <a v-else href="#" class="block py-4 w-full" @click="isOpen = false">
            {{ item.label }}
          </a>
        </template>
      </nav>
    </div>
  </div>
</template>
