<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  contact: '',
  startDate: '',
  endDate: '',
  guests: 1,
  additionalPerson: '',
  notes: '',
})

const guestOptions = [1, 2, 3, 4, 5]
const additionalOptions = [1]

// Date input refs for calendar control
const startDateInput = ref<HTMLInputElement | null>(null)
const endDateInput = ref<HTMLInputElement | null>(null)

const openStartDateCalendar = () => {
  if (startDateInput.value?.showPicker) {
    startDateInput.value.showPicker()
  } else {
    startDateInput.value?.focus()
  }
}

const openEndDateCalendar = () => {
  if (endDateInput.value?.showPicker) {
    endDateInput.value.showPicker()
  } else {
    endDateInput.value?.focus()
  }
}
</script>

<template>
  <div
    class="bg-gray-50 border border-gray-200 space-y-4 w-full max-w-full lg:max-w-md lg:mx-auto mt-10 md:mt-0 text-sm gap-1 pb-4 flex flex-col"
  >
    <!-- Title -->
    <div
      class="text-xl font-semibold mb-4 text-gray-500 bg-gray-100 py-3.5 flex items-center justify-center gap-2"
    >
      <i class="fa-solid fa-calendar-days"></i>
      <p class="uppercase">Inquiry Details</p>
    </div>

    <!-- Dates -->
    <div class="flex px-5 gap-0 text-gray-500">
      <!-- Start Date -->
      <div class="w-1/2 cursor-pointer" @click="openStartDateCalendar">
        <!-- <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label> -->
        <div class="relative">
          <input
            ref="startDateInput"
            v-model="form.startDate"
            type="date"
            class="w-full border border-gray-300 px-4 py-2 rounded-l focus:outline-none focus:ring-1 focus:ring-[#c4a164] opacity-0 absolute top-0 left-0"
          />
          <div class="w-full border border-gray-300 px-4 py-2 rounded-l bg-white">
            {{ form.startDate || new Date().toISOString().slice(0, 10) }}
          </div>
        </div>
      </div>

      <!-- End Date -->
      <div class="w-1/2 cursor-pointer" @click="openEndDateCalendar">
        <!-- <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label> -->
        <div class="relative">
          <input
            ref="endDateInput"
            v-model="form.endDate"
            type="date"
            class="w-full border border-gray-300 px-4 py-2 rounded-r focus:outline-none focus:ring-1 focus:ring-[#c4a164] opacity-0 absolute top-0 left-0"
          />
          <div class="w-full border border-gray-300 px-4 py-2 rounded-r bg-white">
            {{ form.endDate || new Date(Date.now() + 86400000).toISOString().slice(0, 10) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Name -->
    <div class="flex px-5 gap-0">
      <div class="w-1/2">
        <!-- <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label> -->
        <input
          v-model="form.firstName"
          type="text"
          class="w-full border border-gray-300 px-4 py-2 rounded-l focus:outline-none focus:ring-1 focus:ring-[#c4a164]"
          placeholder="First Name"
        />
      </div>
      <div class="w-1/2">
        <!-- <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label> -->
        <input
          v-model="form.lastName"
          type="text"
          class="w-full border border-gray-300 px-4 py-2 rounded-r focus:outline-none focus:ring-1 focus:ring-[#c4a164]"
          placeholder="Last Name"
        />
      </div>
    </div>

    <!-- Email -->
    <div class="px-5">
      <!-- <label class="block text-sm font-medium text-gray-700 mb-1">Email</label> -->
      <input
        v-model="form.email"
        type="email"
        class="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#c4a164]"
        placeholder="Enter Your Email Address"
      />
    </div>

    <!-- Contact -->
    <div class="px-5">
      <!-- <label class="block text-sm font-medium text-gray-700 mb-1">Contact Number</label> -->
      <input
        v-model="form.contact"
        type="text"
        class="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#c4a164]"
        placeholder="Enter Your Contact Number"
      />
    </div>

    <!-- Guests -->
    <div class="px-5">
      <select
        v-model="form.guests"
        class="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#c4a164]"
      >
        <option disabled value="">Number of Guests</option>
        <option v-for="option in guestOptions" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>

    <!-- Additional Person -->
    <div class="px-5">
      <select
        v-model="form.additionalPerson"
        class="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#c4a164]"
      >
        <option disabled value="">Additional Person</option>
        <option v-for="option in additionalOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Notes -->
    <div class="px-5">
      <!-- <label class="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label> -->
      <textarea
        v-model="form.notes"
        rows="3"
        class="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#c4a164]"
        placeholder="Any additional notes or requests..."
      ></textarea>
    </div>
  </div>
</template>
