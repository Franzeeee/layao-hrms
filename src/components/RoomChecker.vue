<script setup lang="ts">
import { ref } from 'vue'

const checkIn = ref(new Date().toISOString().slice(0, 10))
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const checkOut = ref(tomorrow.toISOString().slice(0, 10))
const guests = ref(1)

const increaseGuests = () => {
  if (guests.value < 4) guests.value++
}
const decreaseGuests = () => {
  if (guests.value > 1) guests.value--
}

// Refs for the input elements
const checkInInput = ref<HTMLInputElement | null>(null)
const checkOutInput = ref<HTMLInputElement | null>(null)

const openCheckInCalendar = () => {
  if (checkInInput.value) {
    if ('showPicker' in checkInInput.value && typeof checkInInput.value.showPicker === 'function') {
      checkInInput.value.showPicker()
    } else {
      checkInInput.value.focus()
    }
  }
}

const openCheckOutCalendar = () => {
  if (checkOutInput.value) {
    if (
      'showPicker' in checkOutInput.value &&
      typeof checkOutInput.value.showPicker === 'function'
    ) {
      checkOutInput.value.showPicker()
    } else {
      checkOutInput.value.focus()
    }
  }
}
</script>

<template>
  <div
    class="bg-white shadow-md mx-auto -mt-20 relative z-20 overflow-hidden w-[90%] max-w-[700px] text-black select-none"
  >
    <div class="flex flex-col md:flex-row">
      <!-- First 3 items always in one row -->
      <div class="flex w-full flex-row">
        <!-- Check-in -->
        <div
          class="flex items-center justify-between border-r border-gray-200 p-4 w-1/3 h-[135px] cursor-pointer"
          @click="openCheckInCalendar"
        >
          <div class="flex flex-col text-center w-full relative">
            <span class="text-sm uppercase text-gray-500 mb-3">Check-in</span>
            <div class="flex items-center justify-center gap-3">
              <span class="text-5xl">
                {{ checkIn ? new Date(checkIn).getDate() : 'Select Date' }}
              </span>
              <span class="text-sm text-gray-500 mb-4">
                {{
                  checkIn ? new Date(checkIn).toLocaleDateString('en-US', { month: 'short' }) : ''
                }}
              </span>
            </div>
            <input
              ref="checkInInput"
              v-model="checkIn"
              type="date"
              class="text-center text-sm focus:outline-none opacity-0 absolute top-0 left-0"
            />
          </div>
        </div>

        <!-- Check-out -->
        <div
          class="flex items-center justify-between border-r border-gray-200 p-4 w-1/3 h-[135px] cursor-pointer"
          @click="openCheckOutCalendar"
        >
          <div class="flex flex-col text-center w-full relative">
            <span class="text-sm uppercase text-gray-500 mb-3">Check-out</span>
            <div class="flex items-center justify-center gap-3">
              <span class="text-5xl">
                {{ checkOut ? new Date(checkOut).getDate() : 'Select Date' }}
              </span>
              <span class="text-sm text-gray-500 mb-4">
                {{
                  checkOut ? new Date(checkOut).toLocaleDateString('en-US', { month: 'short' }) : ''
                }}
              </span>
            </div>
            <input
              ref="checkOutInput"
              v-model="checkOut"
              type="date"
              class="text-center text-sm focus:outline-none opacity-0 absolute top-0 left-0"
            />
          </div>
        </div>

        <!-- Guests -->
        <div class="flex items-center justify-center border-r border-gray-200 p-4 w-1/3 h-[135px]">
          <div class="flex flex-col text-center w-full relative">
            <span class="text-sm uppercase text-gray-500 mb-3">Guest</span>
            <div class="flex items-center justify-center gap-1">
              <!-- Fixed-width number container -->
              <div class="w-12 text-center">
                <span class="text-5xl">{{ guests }}</span>
              </div>

              <!-- Arrows stacked vertically -->
              <div class="flex flex-col gap-1">
                <button
                  @click.stop="increaseGuests"
                  class="text-gray-500 text-sm hover:text-black cursor-pointer"
                >
                  ▲
                </button>
                <button
                  @click.stop="decreaseGuests"
                  class="text-gray-500 text-sm hover:text-black cursor-pointer"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Button -->
      <div
        class="flex items-center justify-center bg-[#c4a164] text-white w-full md:w-[230px] h-[85px] md:h-[135px] cursor-pointer hover:opacity-90 px-5 text-center"
      >
        <span class="text-md uppercase">Check Availability</span>
      </div>
    </div>
  </div>
</template>
