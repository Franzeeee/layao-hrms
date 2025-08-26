<script setup lang="ts">
const props = defineProps<{
  text: string
  items: { icon?: string; text: string }[]
  defaultIcon?: string
}>()
const defaultIcon = props.defaultIcon || 'fa-solid fa-check'
</script>

<template>
  <p class="text-gray-400 text-left">{{ props.text }}</p>
  <ul class="grid grid-cols-2 md:grid-cols-3 gap-2 w-full mt-2">
    <li
      v-for="(item, index) in props.items"
      :key="index"
      class="flex items-center gap-2 text-gray-700"
    >
      <i :class="item.icon || defaultIcon" class="text-[#c4a164] w-5"></i>
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>
