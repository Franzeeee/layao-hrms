<script setup lang="ts">
// import { Head } from '@inertiajs/vue3'
import FeatureSection from '@/components/layout/FeatureSection.vue'
import HeroBannerBreadcrumbs from '@/components/HeroBanner.vue'
import MultiStepHeader from '@/components/MultiStepHeader.vue'
import Button from '@/components/ui/Button/Button.vue'
import StepOne from '@/components/booking/multistep/StepOne.vue'
import { ref } from 'vue'
import StepTwo from '@/components/booking/multistep/StepTwo.vue'
import { useBooking } from '../composables/useBooking'

const steps = [
  { label: 'Room and Date' },
  { label: 'Hotel Checkout' },
  { label: 'Payment' },
  { label: 'Confirmation' },
]

const { bookings, removeBooking, updateRoomDates, addBooking } = useBooking()

const handleAddRoomDates = (payload: {
  roomid: number
  roomName: string
  startDate: string
  endDate: string
  dates: string[]
  guests?: number
}) => {
  addBooking(
    payload.roomid,
    payload.roomName,
    payload.startDate,
    payload.endDate,
    payload.dates,
    payload.guests,
  )
}

const handdleUpdateRoomDates = (payload: {
  roomid: number
  roomName: string
  startDate: string
  endDate: string
  dates: string[]
  guests?: number
}) => {
  updateRoomDates(
    payload.roomid,
    payload.roomName,
    payload.startDate,
    payload.endDate,
    payload.dates,
    payload.guests,
  )
}

const currentStep = ref(0)

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1 && bookings.value.length > 0) {
    currentStep.value++
  } else {
    // Handle case where no bookings are made
    alert('Please add at least one booking before proceeding.')
  }
}
</script>
<template>
  <!-- <Head title="Rooms" /> -->
  <HeroBannerBreadcrumbs
    title="Our Rooms"
    :breadcrumbs="[{ text: 'Home', link: '/' }, { text: 'Rooms' }]"
    backgroundImage="/images/hero-img.jpg"
  />

  <FeatureSection
    title="Book Your Stay"
    description="Explore our luxurious rooms and book your perfect stay with us."
    :cols="1"
  >
    <MultiStepHeader :steps="steps" :currentStep="currentStep" />

    <!-- Dynamic Step Components -->
    <StepOne
      v-if="currentStep === 0"
      :bookings="bookings"
      @add-room-dates="handleAddRoomDates"
      @remove-room-dates="(payload) => removeBooking(payload.roomId)"
      @update-room-dates="handdleUpdateRoomDates"
    />

    <StepTwo v-if="currentStep === 1" />

    <div class="w-full flex justify-between">
      <Button :buttonFillType="false" @click="previousStep">Previous</Button>
      <Button @click="nextStep">Next</Button>
    </div>
  </FeatureSection>
</template>
