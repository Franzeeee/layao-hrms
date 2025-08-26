<template>
  <div>
    <div class="flex gap-2 mb-4">
      <button
        v-for="(tab, idx) in tabs"
        :key="tab.label"
        :class="[
          'px-4 py-2 rounded transition-colors',
          idx === selectedIdx
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        ]"
        @click="selectedIdx = idx"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="rounded">
      <slot :name="tabs[selectedIdx].slot"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

defineProps<{
  tabs: { label: string; slot: string }[]
}>()

const selectedIdx = ref(0)
</script>
