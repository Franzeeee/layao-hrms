<script setup lang="ts">
import { ref, defineExpose, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import ModernCalendar from '@/components/booking/ModernCalendar.vue'
import dayjs from 'dayjs'
import { useBooking } from '@/composables/useBooking'

// Props for the room object
const props = defineProps<{
  room: {
    id: string
    name: string
  }
}>()

type BookingData = {
  roomid: number
  roomName: string
  startDate: string
  endDate: string
  dates: string[]
  guests?: number
  rate?: number
}

// Emits for date selection
const emit = defineEmits<{
  (e: 'update:selected', data: BookingData): void
  (e: 'clear-all'): void
}>()

const clearAllDates = () => {
  startDate.value = ''
  endDate.value = ''

  useBooking().bookings.value = useBooking().bookings.value.filter(
    (b) => b.roomId.toString() !== props.room.id,
  )
}

defineExpose({ clearAllDates })

onMounted(() => {
  const booking = useBooking().bookings.value.find((b) => b.roomId.toString() === props.room.id)

  if (booking) {
    startDate.value = booking.startDate
    endDate.value = booking.endDate || ''

    // Emit automatically so parent knows about existing booking
    handleDataSelect({
      roomid: Number(booking.roomId),
      roomName: booking.roomName,
      startDate: booking.startDate,
      endDate: booking.endDate,
      dates: booking.dates,
      guests: booking.guests ?? 0,
      rate: booking.rate,
    })
  }
})

library.add(faCalendarAlt)

const startDate = ref('')
const endDate = ref('')
const isCalendarOpen = ref(false)
const activeField = ref<'start' | 'end'>('start')
const activeRoomId = ref('')

const openCalendar = (field: 'start' | 'end', roomId: string) => {
  activeRoomId.value = ''
  activeField.value = field
  isCalendarOpen.value = true
  activeRoomId.value = roomId
}

const closeCalendar = () => {
  isCalendarOpen.value = false
}

const handleDateSelect = (dates: { start: string; end: string }) => {
  startDate.value = dates.start
  endDate.value = dates.end || ''
  closeCalendar()

  // Loop out to get the list of dates from start to end
  const start = dayjs(startDate.value)
  const end = dayjs(endDate.value)
  const dateList: string[] = []
  for (let d = start; d.isBefore(end) || d.isSame(end, 'day'); d = d.add(1, 'day')) {
    dateList.push(d.format('YYYY-MM-DD'))
  }
  // Emit the selected dates
  handleDataSelect({
    roomid: Number(activeRoomId.value),
    roomName: props.room.name || '',
    startDate: startDate.value,
    endDate: endDate.value,
    dates: dateList,
    guests: 0,
  })
}

const handleDataSelect = (data: BookingData) => {
  emit('update:selected', {
    roomid: data.roomid,
    roomName: data.roomName,
    startDate: data.startDate,
    endDate: data.endDate,
    dates: data.dates,
    guests: data.guests,
  })
}
</script>

<template>
  <div
    class="bg-white rounded-xl border-t shadow-md p-4 w-full max-w-md transition-colors duration-200"
    :class="{
      'border-[var(--primary-color-3)] border': startDate && endDate,
      'border-red-500 border': (startDate && !endDate) || (!startDate && endDate),
      'border-gray-100': !startDate && !endDate,
    }"
  >
    <!-- Image on Top -->
    <div class="mb-4">
      <img
        src="/images/beach-villa-suite.jpg"
        alt="Beach Villa Suite Image"
        class="w-full h-40 object-cover rounded-lg min-h-56 md:min-h-50"
      />
    </div>

    <!-- Row 1: Room Name or Info -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-800">{{ room.name }}</h3>
      <p class="text-sm text-gray-500">Select your booking dates</p>
    </div>

    <!-- Row 2: Date Inputs -->
    <div class="grid grid-cols-2 gap-4 items-center">
      <!-- Start Date -->
      <div>
        <label class="text-sm text-gray-600 mb-1 block">Start Date</label>
        <div class="relative">
          <input
            type="text"
            v-model="startDate"
            readonly
            class="w-full border rounded-lg p-2 pr-10 text-sm focus:outline-none focus:ring focus:ring-primary-200 text-gray-500"
            placeholder="e.g. 2024-06-01"
            @click="openCalendar('start', room.id)"
          />
          <font-awesome-icon
            icon="calendar-alt"
            class="absolute right-2 top-2.5 w-4 h-4 text-gray-400 cursor-pointer"
            @click="openCalendar('start', room.id)"
          />
        </div>
      </div>

      <!-- End Date -->
      <div>
        <label class="text-sm text-gray-600 mb-1 block">End Date</label>
        <div class="relative">
          <input
            type="text"
            v-model="endDate"
            readonly
            class="w-full border rounded-lg p-2 pr-10 text-sm focus:outline-none focus:ring focus:ring-primary-200 text-gray-500"
            placeholder="e.g. 2024-06-15"
            @click="openCalendar('end', room.id)"
          />
          <font-awesome-icon
            icon="calendar-alt"
            class="absolute right-2 top-2.5 w-4 h-4 text-gray-400 cursor-pointer"
            @click="openCalendar('end', room.id)"
          />
        </div>
      </div>
    </div>

    <button
      v-if="startDate || endDate"
      type="button"
      @click="
        () => {
          clearAllDates()
        }
      "
      class="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200 transition"
      aria-label="Clear booking dates"
      title="Clear booking dates"
    >
      Clear dates
    </button>

    <!-- Calendar Modal -->
    <div
      v-if="isCalendarOpen"
      class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      @click="closeCalendar"
    >
      <div class="bg-white p-4 rounded-xl shadow-lg min-w-[300px]" @click.stop>
        <p class="mb-2 text-sm font-medium text-gray-600">Pick a {{ activeField }} date</p>
        <div class="text-center text-sm text-gray-400 italic">
          <ModernCalendar @select="handleDateSelect" />
        </div>
      </div>
    </div>
  </div>
</template>
