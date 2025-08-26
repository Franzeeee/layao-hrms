<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
    >
    <div class="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6">
      <!-- Title -->
      <h2 class="text-lg font-semibold text-gray-800 mb-3">
        {{ title }}
      </h2>

      <!-- Message -->
      <p class="text-sm text-gray-600 mb-6">
        {{ message }}
      </p>

      <!-- Buttons -->
      <div class="flex justify-end gap-3">
        <button
          @click="onCancel"
          class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
        >
          Cancel
        </button>
        <button
          @click="onConfirm"
          class="px-4 py-2 rounded-lg bg-[var(--primary-color-3)] hover:bg-[var(--primary-color-1)] cursor-pointer text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
const props = defineProps<{
  visible: boolean
  title?: string
  message?: string
}>()

const emit = defineEmits(['confirm', 'cancel'])

const onConfirm = () => emit('confirm')
const onCancel = () => emit('cancel')
</script>
