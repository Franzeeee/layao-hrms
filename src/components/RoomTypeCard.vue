<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: 'Default Title' },
  description: { type: String, default: 'This is a default description.' },
  img: { type: String, default: '/path/to/default-icon.svg' },
})
</script>

<template>
  <div
    class="grid w-full border border-gray-100 shadow-sm lg:grid-cols-[1.3fr_2fr_.7fr] md:grid-cols-[1.3fr_2fr_.7fr] grid-cols-1"
  >
    <!-- Image -->
    <div class="flex items-center justify-center">
      <img :src="props.img" alt="icon" class="w-full h-full max-h-70 object-cover" />
    </div>

    <div class="bg-white flex flex-col justify-center py-4 px-2 pl-7">
      <h1 class="text-gray-500 text-3xl font-semibold mb-4 text-left">{{ props.title }}</h1>
      <p class="text-gray-400 text-sm text-left mb-4">{{ props.description }}</p>

      <div class="flex flex-wrap gap-3 mt-2">
        <div class="relative group">
          <div class="flex items-center justify-center w-10 h-10 border border-gray-300 rounded">
            <i class="fas fa-bed text-gray-500 text-lg"></i>
          </div>
          <!-- hover card -->
          <div
            class="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-[#c4a164] text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap z-10"
          >
            <div class="font-semibold">Beds</div>
            <div class="text-gray-50">King size</div>
          </div>
        </div>

        <div class="relative group">
          <div class="flex items-center justify-center w-10 h-10 border border-gray-300 rounded">
            <i class="fas fa-user-friends text-gray-500 text-lg"></i>
          </div>
          <div
            class="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-[#c4a164] text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap z-10"
          >
            <div class="font-semibold">Capacity</div>
            <div class="text-gray-50">2 guests</div>
          </div>
        </div>

        <div class="relative group">
          <div class="flex items-center justify-center w-10 h-10 border border-gray-300 rounded">
            <i class="fas fa-expand text-gray-500 text-lg"></i>
          </div>
          <div
            class="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-[#c4a164] text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap z-10"
          >
            <div class="font-semibold">Size</div>
            <div class="text-gray-50">25 m²</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Price & button -->
    <div class="bg-gray-100 flex flex-col items-center justify-around gap-2 md:gap-0 py-4 md:py-0">
      <div>
        <h1 class="text-4xl text-gray-500">$100</h1>
        <p class="uppercase text-gray-400 text-sm mt-2">Per night</p>
      </div>
      <div>
        <router-link
          to="/rooms/1"
          class="text-sm text-[#c4a164] cursor-pointer border px-4 border-[#c4a164] hover:bg-[#c4a164] hover:text-white transition-all duration-300 ease-in-out py-3 uppercase"
        >
          View details
        </router-link>
      </div>
    </div>
  </div>
</template>
