<template>
  <div
    class="room-card w-full rounded-xl overflow-hidden min-h-32 p-4 space-y-4 flex flex-col items-center justify-center"
  >
    <!-- 🔧 Controls -->
    <div class="w-full flex flex-col gap-4 items-center select-none">
      <!-- Booking Type Row -->
      <div class="flex md:flex-row flex-col items-center justify-center gap-4 w-full">
        <label class="text-sm font-medium text-gray-700">Booking Type:</label>
        <select
          class="border border-gray-300 rounded px-2 py-1 text-sm text-gray-600"
          v-model="selectedBookingType"
          @change="emit('change-booking-type', selectedBookingType)"
        >
          <option value="calendar">Calendar View</option>
          <option value="form">Form Entry</option>
        </select>

        <label v-show="selectedBookingType === 'calendar'" class="text-sm font-medium text-gray-700"
          >Show Days:</label
        >
        <select
          v-model="selectedDays"
          v-show="selectedBookingType === 'calendar'"
          @change="emit('change-days', Number(selectedDays))"
          class="border border-gray-300 rounded px-2 py-1 text-sm text-gray-600"
        >
          <option value="7">7 Days</option>
          <option value="14">14 Days</option>
          <option value="30">Whole Month</option>
        </select>
      </div>

      <!-- Controls Row -->
      <div class="flex items-center justify-center gap-4 w-full">
        <button
          @click="emit('clear')"
          class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded flex items-center gap-2 cursor-pointer"
        >
          <i class="fa fa-times"></i>
          Clear Booking Selection
        </button>
      </div>
    </div>

    <!-- 🎨 Legend -->
    <Legend :legend="legend" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import Legend from '@/components/booking/Legend.vue'

const emit = defineEmits<{
  (e: 'clear'): void
  (e: 'change-days', newValue: number): void
  (e: 'change-booking-type', newValue: string): void
}>()

defineProps<{
  legend: Array<{ label: string; bgColor: string }>
}>()

const selectedDays = ref(7)
const selectedBookingType = ref('calendar')
</script>
