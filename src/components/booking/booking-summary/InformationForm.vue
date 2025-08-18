<script setup lang="ts">
import { ref, watch } from 'vue'
import { useBookingDetails } from '@/store/bookingDetails'

const bookingDetails = useBookingDetails()

// const guestOptions = [1, 2, 3, 4, 5];
const additionalOptions = [1, 2, 3, 4]

function onPhoneKeypress(e: KeyboardEvent) {
  const target = e.target as HTMLInputElement | null
  const key = e.key
  if (!target) return
  if (!/[0-9+]/.test(key) || (key === '+' && target.selectionStart !== 0)) {
    e.preventDefault()
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

    <div class="px-5">
      <!-- <label class="block text-sm font-medium text-gray-700 mb-1">Email</label> -->
      <input
        v-model="bookingDetails.phone"
        type="tel"
        inputmode="tel"
        pattern="^(?:\+63|0)9\d{9}$"
        :maxlength="bookingDetails.phone && bookingDetails.phone.startsWith('+') ? 13 : 11"
        class="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#c4a164] peer"
        placeholder="Enter Your Contact Number"
        title="Valid formats: 09XXXXXXXXX or +639XXXXXXXXX — digits only, plus allowed only as leading char"
        @keypress="onPhoneKeypress"
      />
      <p class="text-xs text-gray-400 mt-1 hidden peer-focus:block">
        Allowed: 09XXXXXXXXX or +639XXXXXXXXX
      </p>
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
