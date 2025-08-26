<script setup lang="ts">
// import { Head } from '@inertiajs/vue3'
import FeatureSection from '@/components/layout/FeatureSection.vue'
import HeroBannerBreadcrumbs from '@/components/HeroBanner.vue'
import MultiStepHeader from '@/components/MultiStepHeader.vue'
import Button from '@/components/ui/Button/Button.vue'
import StepOne from '@/components/booking/multistep/StepOne.vue'
import { ref, onMounted, watch } from 'vue'
import StepTwo from '@/components/booking/multistep/StepTwo.vue'
import { useBooking } from '../composables/useBooking'
import { useBookingDetails } from '@/store/bookingDetails'
import ConfirmationModal from '@/components/ui/Modal/ConfirmationModal.vue'
import WarningModal from '@/components/ui/Modal/WarningModal.vue'
import { useEmail } from '@/composables/useEmail'
import { MOCK_ROOM_TYPES } from '@/data/Rooms'
import { useEncryption } from '@/composables/useEncryption'
import { type addRoomDates, type updateRoomDates } from '@/types'

const steps = [
  { label: 'Room and Date' },
  { label: 'Hotel Checkout' },
  { label: 'Reservation Sent' },
]

const { bookings, removeBooking, updateRoomDates, addBooking } = useBooking()
const bookingDetails = useBookingDetails()
const { sendReservationAcknowledgement } = useEmail()
const sendingEmail = ref(false)

const handleAddRoomDates = (payload: addRoomDates) => {
  addBooking(
    payload.roomid,
    payload.roomName,
    payload.startDate,
    payload.endDate,
    payload.dates,
    payload.guests,
    payload.rate,
  )
}

const handleUpdateRoomDates = (payload: updateRoomDates) => {
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

const showModal = ref(false)
const roomTypes = MOCK_ROOM_TYPES
const finalBookingData = ref()

const handleConfirm = async () => {
  showModal.value = false

  const reservationData = {
    firstname: useBookingDetails().firstname,
    lastname: useBookingDetails().lastname,
    email: useBookingDetails().email,
    phone: useBookingDetails().phone,
    guests: String(useBookingDetails().additionalJoiners || ''),
    additionalJoiner: useBookingDetails().additionalJoiners,
    total: useBookingDetails().total,
    subtotal: useBookingDetails().total,
    notes: bookingDetails.notes || '',
    encryptedData: '',
    bookedRooms: finalBookingData.value.bookedRooms.map((room: any) => ({
      image_url: room.image_url || room.imageUrl || '',
      roomName: room.roomName,
      quantity: room.quantity || 1,
      rate: room.rate,
      roomType: (
        roomTypes.find((t: any) => t.type === (room.roomName || room.name)) || {
          type: room.roomName || 'Unknown',
        }
      ).type,
      capacity:
        room.roomName === 'Barkadahan'
          ? bookingDetails.paxForBarkadahan + ` Person`
          : (roomTypes.find((t: any) => t.type === (room.roomName || room.name)) || { capacity: 1 })
              .capacity,
      totalCost: Number(room.total || room.totalCost),
      checkInDate: room.startDate || '',
      checkOutDate: room.endDate || '',
    })),
  }

  reservationData.encryptedData = useEncryption().encryptObject(reservationData)
  console.log(reservationData.encryptedData)

  sendingEmail.value = true

  await sendReservationAcknowledgement(reservationData, 'template_f843d1c')
  await sendReservationAcknowledgement(reservationData, 'template_kydzygp')

  sendingEmail.value = false

  currentStep.value = currentStep.value + 1
}

const showWarning = ref(false)

const handleOk = () => {
  showWarning.value = false
}

const handleModalOpen = () => {
  if (!bookingDetails.roomQuantity || bookingDetails.roomQuantity.length === 0) {
    alert('Please add at least one room before confirming.')
    return
  }

  const fname = bookingDetails.firstname ? String(bookingDetails.firstname).trim() : ''
  const lname = bookingDetails.lastname ? String(bookingDetails.lastname).trim() : ''
  const email = bookingDetails.email ? String(bookingDetails.email).trim() : ''
  const phone = bookingDetails.phone ? String(bookingDetails.phone).trim() : ''

  if (!fname || !lname || (!email && !phone)) {
    showWarning.value = true
    return
  }

  const sanitizeString = (v: any) => (v == null ? '' : String(v))
  const sanitizeNumber = (v: any) => {
    const n = Number(v)
    return isNaN(n) || n === 0 ? 1 : n
  }
  const sanitizeArray = (v: any) => (Array.isArray(v) ? v : [])

  const calcTotal = () =>
    (bookings.value || []).reduce((sum: number, r: any) => {
      const nights = Array.isArray(r.dates) ? r.dates.length : 1
      const rate = Number(r.rate) || 0
      const guestsCount = Number(r.guests) || 1
      return sum + rate * nights * guestsCount
    }, 0)

  const computedTotal = calcTotal()
  const addOnTotal = Number(bookingDetails.addOnTotal) || 1
  const total = Number(bookingDetails.total) || computedTotal || 1

  finalBookingData.value = {
    guests: sanitizeString(bookingDetails.additionalJoiners),
    firstname: sanitizeString(bookingDetails.firstname) || 'Guest',
    lastname: sanitizeString(bookingDetails.lastname) || 'Guest',
    email: sanitizeString(bookingDetails.email) || 'no-reply@example.com',
    phone: sanitizeString(bookingDetails.phone) || 'N/A',
    notes: sanitizeString(bookingDetails.notes),
    bookedRooms: (bookingDetails.bookedRooms || []).map((b: any, index: number) => ({
      roomid: sanitizeNumber(b.roomid ?? b.id ?? 1),
      roomName: sanitizeString(b.roomName ?? b.name ?? 'Room'),
      startDate: b.startDate,
      endDate: b.endDate,
      dates: sanitizeArray(b.dates),
      rate: Number(b.rate) || 1,
      quantity: bookingDetails.roomQuantity[index] || 1,
      totalCost:
        (b.roomName === 'Barkadahan' ? bookingDetails.paxForBarkadahan : 1) *
        (Number(b.rate) || 1) *
        (bookingDetails.roomQuantity[index] || 1),
    })),
    total: useBookingDetails().total || total,
    addOnTotal: addOnTotal === 0 ? 1 : addOnTotal,
    roomQuantity: sanitizeArray(bookingDetails.roomQuantity).map((n: any) => sanitizeNumber(n)),
  }

  showModal.value = true
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
      @update-room-dates="handleUpdateRoomDates"
    />

    <StepTwo v-if="currentStep === 1" />

    <div class="w-full flex justify-between">
      <Button
        :buttonFillType="false"
        :disabled="currentStep === steps.length - 1 || sendingEmail"
        :isDisabled="currentStep === steps.length - 1 || sendingEmail"
        @click="!sendingEmail && previousStep()"
      >
        Previous
      </Button>
      <Button
        :disabled="sendingEmail"
        :isDisabled="sendingEmail"
        @click="
          !sendingEmail && (currentStep === steps.length - 2 ? handleModalOpen() : nextStep())
        "
      >
        <i
          :class="
            sendingEmail
              ? 'fas fa-spinner fa-spin mr-2'
              : currentStep === steps.length - 2
                ? 'fas fa-paper-plane mr-2'
                : 'fas fa-arrow-right mr-2'
          "
          aria-hidden="true"
        ></i>
        {{
          sendingEmail
            ? 'Reservation in Progress...'
            : currentStep === steps.length - 2
              ? 'Confirm Reservation'
              : 'Next'
        }}
      </Button>

      <!-- Confirmation Modal -->
      <ConfirmationModal
        :visible="showModal"
        title="Confirm Booking?"
        message="Are you sure you want to confirm this booking?"
        @confirm="handleConfirm"
        @cancel="showModal = false"
      />
      <WarningModal
        :visible="showWarning"
        title="Form Validation Error"
        message="Please check your input and try again."
        @ok="handleOk"
      />
    </div>
  </FeatureSection>
</template>
