<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  bg: {
    type: String,
    default: 'bg-white',
  },
  cols: {
    type: Number,
    default: 2,
  },
  withWave: {
    type: Boolean,
    default: true,
  },
})

// Computed class with known variants so Tailwind can detect them:
const gridColsClass = computed(() => {
  switch (props.cols) {
    case 1:
      return 'grid-cols-1 md:grid-cols-1'
    case 2:
      return 'grid-cols-1 md:grid-cols-2'
    case 3:
      return 'grid-cols-1 md:grid-cols-3'
    case 4:
      return 'grid-cols-1 md:grid-cols-4'
    default:
      return 'grid-cols-1 md:grid-cols-2'
  }
})
</script>

<template>
  <section :class="[props.bg, 'py-10 md:py-16 lg:py-20', 'mt-2 md:mt-4 lg:mt-5']">
    <div class="max-w-6xl mx-auto text-center px-4">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 uppercase text-gray-400">{{ props.title }}</h2>
      <span>
        <img
          v-if="props.withWave"
          src="/svg/wave.svg"
          alt="Section Icon"
          :class="['mx-auto', 'mb-8', 'w-[80px]']"
        />
      </span>
      <p class="text-gray-400 mb-10 text-sm text-center max-w-[80%] m-auto">
        {{ props.description }}
      </p>

      <div class="grid gap-6 auto-rows-auto" :class="gridColsClass">
        <slot />
      </div>
    </div>
  </section>
</template>
