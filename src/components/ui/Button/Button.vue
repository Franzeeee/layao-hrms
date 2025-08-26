<template>
  <button
    :class="[
      'px-5 py-2 rounded font-semibold cursor-pointer transition-colors duration-200',
      buttonFillType
        ? 'text-white ' +
          (isDisabled
            ? 'bg-[var(--primary-color-2)] hover:bg-[var(--primary-color-2)]'
            : 'bg-[var(--primary-color-3)] hover:bg-[var(--primary-color-1)]')
        : 'border-2 ' +
          (isDisabled
            ? 'border-[var(--primary-color-2)] text-[var(--primary-color-2)] bg-transparent hover:bg-transparent'
            : 'border-[var(--primary-color-3)] text-[var(--primary-color-3)] bg-transparent hover:bg-[var(--primary-color-3)] hover:text-white'),
    ]"
    :disabled="isDisabled"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  },
  buttonFillType: {
    type: Boolean,
    default: true,
  },
})
</script>
