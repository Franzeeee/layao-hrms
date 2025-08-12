<script setup lang="ts">
const props = defineProps<{
  nights: number
  pricePerNight: number
}>()

const total = props.nights * props.pricePerNight
</script>

<template>
  <div class="flex items-center -mb-3 gap-1">
    <i class="fas fa-money-bill-wave text-[#d4a24b] mr-2"></i>
    <h2 class="font-semibold uppercase">Breakdown</h2>
  </div>
  <div class="border-4 border-double p-5 bg-[#fff5e5]" style="border-color: #c4a164">
    <p class="text-sm text-left mb-4">Please review the details below.</p>
    <div class="flex flex-row gap-2 mb-2">
      <span class="text-xs flex items-center gap-2 w-2/4">
        <i class="fas fa-calendar-alt text-[#d4a24b]"></i>
        Number of nights:
      </span>
      <span class="text-center text-sm w-1/4">{{ nights }}</span>
      <span class="text-right text-sm w-1/4">₱{{ pricePerNight }}</span>
    </div>
    <hr />
    <div class="flex items-center mt-2 justify-between text-lg">
      <div class="flex items-center">
        <i class="fa-solid fa-credit-card text-[#d4a24b] mr-2"></i>
        <p class="font-semibold">Total:</p>
      </div>
      <p class="font-semibold">₱{{ total.toLocaleString() }}</p>
    </div>
  </div>
</template>
