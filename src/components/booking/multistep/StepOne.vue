<template>
  <div class="w-full">
    <Controls
      :isMobile="isMobile"
      :bookingType="bookingType"
      @change-days="updateDays"
      @clear="clearSelection"
      @change-booking-type="changeBookingType"
      :legend="bookingType === 'calendar' ? calendarLegend : cardLegend"
    />
  </div>

  <!-- Show calendar view only if NOT mobile and bookingType is 'calendar' -->
  <div class="grid grid-cols-3 gap-3 w-full" v-if="bookingType === 'calendar' && !isMobile">
    <div class="col-span-1 bg-white shadow p-4 flex flex-col items-center">
      <div>
        <h4 class="text-3xl font-semibold uppercase text-black">Room Type</h4>
        <p class="text-gray-600 md:text-sm text-xs lg:text-base">Select your preferred room type</p>
        <div class="w-0.5 h-8 bg-gray-300 my-4 m-auto"></div>
      </div>
      <draggable
        v-model="rooms"
        item-key="id"
        group="rooms"
        class="flex flex-col flex-1 gap-4 w-full place-items-center overflow-y-auto"
      >
        <template #item="{ element }">
          <RoomCard :room="element" />
        </template>
      </draggable>
    </div>

    <div class="col-span-2 bg-gray-50 shadow p-4">
      <div>
        <h4 class="text-3xl font-semibold uppercase text-black">Date</h4>
        <p class="text-gray-600">Select your preferred date</p>
        <div class="w-0.5 h-8 bg-gray-300 my-4 m-auto"></div>
      </div>

      <div class="flex flex-col gap-2 mt-4 overflow-auto">
        <DraggableCalendar
          :bookedRooms="getInitialSelectedDates"
          ref="calendarRef"
          :rooms="rooms.map((room) => ({ id: String(room.id), name: room.type }))"
          :startDate="new Date().toISOString().slice(0, 10)"
          :numberOfDays="dateRange"
          :unavailable="unavailableDates"
          interactionMode="drag"
          @update:selected="handleSelected"
        />
      </div>
    </div>
  </div>

  <!-- Always show card-based view on mobile or when bookingType is not calendar -->
  <div
    v-else
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-white rounded-md place-items-center"
  >
    <RoomDateRangeCard
      v-for="room in rooms"
      :key="room.id"
      :room="{ id: String(room.id), name: room.type }"
      :bookings="bookings.filter((b) => b.roomId === Number(room.id))"
      @update:selected="handleCardDataSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DraggableCalendar from '@/components/DraggableCalendar.vue'
import RoomCard from '@/components/booking/RoomCard.vue'
import Controls from '../Controls.vue'
import draggable from 'vuedraggable'
import RoomDateRangeCard from '@/components/booking/RoomDateRangeCard.vue'
import { MOCK_ROOM_TYPES } from '@/data/Rooms'

defineProps<{
  bookings: Array<{
    roomId: number
    roomName: string
    startDate: string
    endDate: string
    dates: string[]
    guests?: number
  }>
}>()

const emit = defineEmits<{
  (
    e: 'add-room-dates',
    payload: {
      roomid: number
      roomName: string
      startDate: string
      endDate: string
      dates: string[]
      guests?: number
      rate?: number
    },
  ): void
  (
    e: 'update-room-dates',
    payload: {
      roomid: number
      roomName: string
      startDate: string
      endDate: string
      dates: string[]
      guests?: number
      rate?: number
    },
  ): void
  (e: 'remove-room-dates', payload: { roomId: number }): void
}>()

const rooms = ref(MOCK_ROOM_TYPES)
const unavailableDates = ref([
  { roomId: '1', dates: ['2025-07-21', '2025-07-22'] },
  { roomId: '2', dates: ['2025-07-23'] },
  { roomId: '3', dates: ['2025-07-24', '2025-07-25'] },
])

const calendarLegend = ref([
  { label: 'Available', bgColor: 'bg-white' },
  { label: 'Selected', bgColor: 'bg-[var(--primary-color-3)]' },
  { label: 'Unavailable', bgColor: 'bg-gray-200' },
])

const cardLegend = ref([
  { label: 'Selected', bgColor: 'bg-[var(--primary-color-3)]' },
  { label: 'Incomplete Dates', bgColor: 'bg-red-600' },
  { label: 'Unavailable', bgColor: 'bg-gray-500' },
  { label: 'Available', bgColor: 'bg-white' },
])

const dateRange = ref(7)
const bookingType = ref<'calendar' | 'other'>('calendar')
const calendarRef = ref()
const selectedDates = ref<Record<string, string[]>>({})
const isMobile = ref(false)

const getInitialSelectedDates = () => {
  return selectedDates.value
}

const clearSelection = () => {
  rooms.value.forEach((room) => {
    emit('remove-room-dates', { roomId: Number(room.id) })
  })
  selectedDates.value = {}
  calendarRef.value?.clearSelection()
}

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const changeBookingType = (type: string) => {
  if (isMobile.value && type === 'calendar') return
  bookingType.value = type as 'calendar' | 'other'
  calendarRef.value?.clearSelection()
  selectedDates.value = {}
}

const updateDays = (value: number) => {
  dateRange.value = value
}

const handleSelected = (data: Record<string, string[]>) => {
  selectedDates.value = data
  Object.entries(data).forEach(([roomId, dates]) => {
    if (dates.length > 0) {
      const startDate = dates[0]
      const endDate = dates[dates.length - 1]
      emit('add-room-dates', {
        roomid: Number(roomId),
        roomName: rooms.value.find((r) => String(r.id) === roomId)?.type || '',
        startDate,
        endDate,
        dates,
        guests: undefined,
        rate: rooms.value.find((r) => String(r.id) === roomId)?.rate,
      })
    } else {
      emit('remove-room-dates', { roomId: Number(roomId) })
    }
  })
}

const handleCardDataSelected = (data: {
  roomid: number
  roomName: string
  startDate: string
  endDate: string
  dates: string[]
  guests?: number
  rate?: number
}) => {
  // Use a string key because selectedDates keys are strings
  const key = String(data.roomid)
  const existing = selectedDates.value[key]

  // Find room by id to reliably get the rate
  const room = rooms.value.find((r) => String(r.id) === key)
  const resolvedRate = data.rate ?? room?.rate

  if (existing) {
    emit('update-room-dates', {
      roomid: data.roomid,
      roomName: data.roomName,
      startDate: data.startDate,
      endDate: data.endDate,
      dates: data.dates,
      guests: data.guests,
      rate: resolvedRate,
    })
  } else {
    emit('add-room-dates', {
      roomid: data.roomid,
      roomName: data.roomName,
      startDate: data.startDate,
      endDate: data.endDate,
      dates: data.dates,
      guests: data.guests,
      rate: resolvedRate,
    })
  }
}
</script>
