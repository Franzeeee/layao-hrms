<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Default Title',
  },
  description: {
    type: String,
    default: 'This is a default description for the information card.',
  },
  icon: {
    type: String,
    default: 'fa-solid fa-info-circle',
  },
})
</script>

<template>
  <div class="grid grid-cols-[.8fr_4fr] w-full h-24">
    <div class="p-2 flex items-center justify-center bg-white">
      <i :class="props.icon" class="text-3xl text-[#c4a164]"></i>
    </div>
    <div class="bg-white flex items-start justify-baseline py-2 pr-2 flex-col">
      <h1 class="text-gray-500 text-xl font-semibold mb-1">{{ props.title }}</h1>
      <p class="text-gray-400 text-sm text-left">{{ props.description }}</p>
    </div>
  </div>
</template>
