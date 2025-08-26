<script setup lang="ts">
const props = defineProps<{ items: string[] }>()
</script>

<template>
  <h1 class="text-4xl text-gray-500 font-semibold mb-2 mt-10">AMENITIES</h1>
  <ul class="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
    <li v-for="(item, index) in props.items" :key="index" class="flex items-center gap-2">
      <i class="fa fa-check text-[#c4a164] text-sm font-bold"></i>
      <span>{{ item }}</span>
    </li>
  </ul>
</template>
