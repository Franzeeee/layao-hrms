<script setup lang="ts">
const props = defineProps<{ title: string }>()
</script>

<template>
  <h2 class="text-4xl font-bold text-gray-500">{{ props.title }} Room</h2>
</template>
