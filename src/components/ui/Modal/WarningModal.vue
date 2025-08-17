<template>
  <teleport to="body">
    <transition name="fade-scale">
      <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <div class="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6">
          <!-- Title -->
          <div class="flex items-center gap-2 mb-3">
            <i class="fa-solid fa-triangle-exclamation text-red-500 text-xl" aria-hidden="true"></i>
            <h2 class="text-lg font-semibold text-red-600">
              {{ title || 'Warning' }}
            </h2>
          </div>

          <!-- Message -->
          <p class="text-sm text-gray-700 mb-6">
            {{ message }}
          </p>

          <!-- OK Button -->
          <div class="flex justify-end">
            <button
              @click="onOk"
              class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer text-white"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  title?: string
  message?: string
}>()

const emit = defineEmits<{
  (e: 'ok'): void
}>()

const onOk = () => emit('ok')
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.25s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
}
</style>
