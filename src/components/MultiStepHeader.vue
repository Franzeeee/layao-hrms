<template>
  <div class="flex items-center gap-4 overflow-x-auto py-2 m-auto select-none w-full lg:w-2/3">
    <template v-for="(step, index) in steps" :key="index">
      <div class="flex items-center gap-2">
        <div
          class="flex items-center justify-center w-8 h-8 rounded-full text-white"
          :class="{
            'bg-[var(--primary-color-3)]': index === currentStep,
            'bg-gray-300': index !== currentStep,
          }"
        >
          {{ index + 1 }}
        </div>
        <!-- Only show label for current step -->
        <div v-if="index === currentStep" class="text-[var(--primary-color-3)] font-semibold">
          {{ step.label }}
        </div>
      </div>
      <div v-if="index < steps.length - 1" class="flex-1 h-px bg-gray-300"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Step {
  label: string
  icon?: string
}

defineProps<{
  steps: Step[]
  currentStep: number
}>()
</script>
