<script setup lang="ts">
import { ref, watch } from 'vue'
import { useBookingDetails } from '@/store/bookingDetails'

const bookingDetails = useBookingDetails()

// const guestOptions = [1, 2, 3, 4, 5];
const additionalOptions = [1, 2, 3, 4]
</script>

<template>
  <div
    class="bg-gray-50 border border-gray-200 space-y-4 w-full max-w-full lg:max-w-md lg:mx-auto mt-10 md:mt-0 text-sm gap-1 pb-4 flex flex-col"
  >
    <!-- Title -->
    <div
      class="text-xl font-semibold mb-4 text-gray-500 bg-gray-100 py-3.5 flex items-center justify-center gap-2"
    >
      <i class="fa-solid fa-clipboard"></i>
      <p class="uppercase">Personal Details</p>
    </div>

    <!-- Name -->
    <div class="flex px-5 gap-0">
      <div class="w-1/2">
        <!-- <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label> -->
        <input
          v-model="bookingDetails.firstname"
          type="text"
          class="w-full border border-gray-300 px-4 py-2 rounded-l focus:outline-none focus:ring-1 focus:ring-[#c4a164]"
          placeholder="First Name"
        />
      </div>
      <div class="w-1/2">
        <!-- <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label> -->
        <input
          v-model="bookingDetails.lastname"
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
        v-model="bookingDetails.email"
        type="email"
        class="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#c4a164]"
        placeholder="Enter Your Email Address"
      />
    </div>

    <!-- Contact -->
    <div class="px-5">
      <!-- <label class="block text-sm font-medium text-gray-700 mb-1">Contact Number</label> -->
      <input
        v-model="bookingDetails.phone"
        type="text"
        class="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#c4a164]"
        placeholder="Enter Your Contact Number"
      />
    </div>

    <!-- Guests -->
    <!-- <div class="px-5">
      <select
        v-model="form.guests"
        class="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#c4a164]"
      >
        <option disabled value="">Number of Guests</option>
        <option v-for="option in guestOptions" :key="option" :value="option">{{ option }}</option>
      </select>
    </div> -->

    <!-- Additional Person -->
    <div class="px-5">
      <select
        v-model="bookingDetails.additionalJoiners"
        class="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#c4a164]"
      >
        <option disabled default value="0">Additional Person (₱999/Pax)</option>
        <option value="0">None</option>
        <option v-for="option in additionalOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Notes -->
    <div class="px-5">
      <!-- <label class="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label> -->
      <textarea
        v-model="bookingDetails.notes"
        rows="3"
        class="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#c4a164]"
        placeholder="Any additional notes or requests..."
      ></textarea>
    </div>
  </div>
</template>
