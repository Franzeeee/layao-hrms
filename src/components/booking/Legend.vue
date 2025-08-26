<template>
  <div class="flex items-center gap-6 text-sm flex-wrap text-gray-600 select-none">
    <span class="font-semibold mr-4 flex items-center">
      <i class="fa fa-info-circle mr-1"></i>
      Legend:
    </span>
    <div v-for="(item, idx) in legend" :key="idx" class="flex items-center gap-2">
      <div class="w-4 h-4 rounded border border-gray-400" :class="item.bgColor"></div>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  legend: Array<{ label: string; bgColor: string }>
}>()
</script>
