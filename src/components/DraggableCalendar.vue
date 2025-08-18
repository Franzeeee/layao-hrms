<template>
  <div class="p-2 w-full overflow-x-auto gridContainer" ref="gridContainer">
    <div
      v-for="room in rooms"
      :key="room.id"
      class="grid gap-2 day-grid mb-2 min-h-48"
      :style="{ gridTemplateColumns: `repeat(${numberOfDays}, minmax(80px, 1fr))` }"
    >
      <div
        v-for="(date, dIdx) in dates"
        :key="`${room.id}-${dIdx}`"
        class="selectable-cell text-center p-4 border border-gray-400 rounded cursor-pointer select-none"
        :data-date="date"
        :data-room="room.id"
        :class="{
          'bg-[var(--primary-color-2)] text-white': isSelected(room.id, date),
          'bg-gray-200 text-gray-500 cursor-not-allowed': isUnavailable(room.id, date),
        }"
        @click="handleClick(room.id, date)"
      >
        <div
          class="flex items-center justify-center h-full w-full"
          :class="{
            'text-gray-400': !isSelected(room.id, date),
            'text-white': isSelected(room.id, date),
          }"
        >
          {{ formatDate(date) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import SelectionArea from '@simonwep/selection-js'
import dayjs from 'dayjs'
import { useBooking } from '@/composables/useBooking'

const emit = defineEmits<{
  (e: 'update:selected', data: Record<string, string[]>): void
}>()

// Props
const props = defineProps<{
  rooms: Array<{ id: string; name: string }>
  startDate: string
  numberOfDays: number
  interactionMode?: 'click' | 'drag' | 'both'
  unavailable?: Array<{ roomId: string; dates: string[] }>
  bookedRooms?: (data: Record<string, string[]>) => void
}>()

// Highlight booked rooms on mount
const bookedRoomDates = ref<Record<string, string[]>>({})

if (props.bookedRooms) {
  const bookedRoomsResult = props.bookedRooms({})
  bookedRoomDates.value = bookedRoomsResult ?? {}
  // Add booked dates to selected set for highlighting
  Object.entries(bookedRoomDates.value).forEach(([roomId, dates]) => {
    dates.forEach((date) => {
      selected.value.add(`${roomId}_${date}`)
    })
  })
}

const gridContainer = ref<HTMLElement | null>(null)
const selected = ref<Set<string>>(new Set()) // Format: roomId_date

// Computed dates array
const dates = computed(() => {
  const start = dayjs(props.startDate)
  return Array.from({ length: props.numberOfDays }, (_, i) =>
    start.add(i, 'day').format('YYYY-MM-DD'),
  )
})

// Helpers
const formatDate = (dateStr: string) => dayjs(dateStr).format('MMM D')

const isSelected = (roomId: string, date: string) => selected.value.has(`${roomId}_${date}`)

const isUnavailable = (roomId: string, date: string) => {
  const match = props.unavailable?.find((u) => u.roomId === roomId)
  return match?.dates.includes(date) ?? false
}

// Handle click logic
const handleClick = (roomId: string, date: string, event?: MouseEvent) => {
  if (props.interactionMode === 'drag' || isUnavailable(roomId, date)) return

  const key = `${roomId}_${date}`

  if (event?.ctrlKey || event?.metaKey) {
    // Ctrl/Meta: toggle selection
    if (selected.value.has(key)) {
      selected.value.delete(key)
    } else {
      selected.value.add(key)
    }
  } else {
    // Normal click:
    if (selected.value.has(key) && selected.value.size === 1) {
      // If only one selected and it's this, deselect it
      selected.value.clear()
    } else if (selected.value.has(key)) {
      // Toggle off
      selected.value.delete(key)
    } else {
      // Select only this one
      selected.value.clear()
      selected.value.add(key)
    }
  }

  // logSelectedRooms()
  emit(
    'update:selected',
    (() => {
      const result: Record<string, string[]> = {}
      selected.value.forEach((entry) => {
        const [roomId, date] = entry.split('_')
        if (!result[roomId]) result[roomId] = []
        result[roomId].push(date)
      })
      return result
    })(),
  )
}
const logSelectedRooms = () => {
  const selectedByRoom: Record<string, string[]> = {}
  selected.value.forEach((entry) => {
    const [roomId, date] = entry.split('_')
    if (!selectedByRoom[roomId]) selectedByRoom[roomId] = []
    selectedByRoom[roomId].push(date)
  })

  console.clear()
  Object.entries(selectedByRoom).forEach(([roomId, dates]) => {
    const sorted = dates.sort()
    const roomName = props.rooms.find((room) => room.id === roomId)?.name || roomId
    console.log(`🏨 ${roomName} — Selected dates: ${sorted.join(', ')}`)
  })
}

// Highlight booked rooms on mount
onMounted(() => {
  console.log('Highlighting booked rooms:')
  console.log(useBooking().bookings.value)
  useBooking().bookings.value.forEach((booking) => {
    const roomId = booking.roomId.toString()
    if (!bookedRoomDates.value[roomId]) {
      bookedRoomDates.value[roomId] = []
    }
    bookedRoomDates.value[roomId].push(...booking.dates)

    // Also mark as selected
    booking.dates.forEach((date) => {
      selected.value.add(`${roomId}_${date}`)
    })
  })
})

// Mount drag interaction if enabled
onMounted(async () => {
  await nextTick()

  if (props.interactionMode === 'click') return

  const selection = new SelectionArea({
    selectables: ['.selectable-cell'],
    boundaries: ['.gridContainer'],
    startareas: ['.gridContainer'],
    class: 'selecting-box',
    allowTouch: false,
  })

  selection
    .on('start', ({ event }) => {
      if (!event || !(event.ctrlKey || event.metaKey)) {
        selected.value.clear()
      }
    })
    .on('move', ({ store }) => {
      for (const el of store.changed.added) {
        const date = el.getAttribute('data-date')
        const room = el.getAttribute('data-room')
        const key = `${room}_${date}`

        if (date && room && !isUnavailable(room, date)) {
          selected.value.add(key)
        }
      }

      for (const el of store.changed.removed) {
        const date = el.getAttribute('data-date')
        const room = el.getAttribute('data-room')
        const key = `${room}_${date}`

        if (date && room && selected.value.has(key)) {
          selected.value.delete(key)
        }
      }
    })
    .on('stop', () => {
      const includesUnavailable = Array.from(selected.value).some((key) => {
        const [roomId, date] = key.split('_')
        return isUnavailable(roomId, date)
      })

      if (includesUnavailable) {
        alert('Booking failed: Unavailable date was included.')
      }

      // logSelectedRooms()
      emit(
        'update:selected',
        (() => {
          const result: Record<string, string[]> = {}
          selected.value.forEach((entry) => {
            const [roomId, date] = entry.split('_')
            if (!result[roomId]) result[roomId] = []
            result[roomId].push(date)
          })
          return result
        })(),
      )
    })
})

defineExpose({
  selectedDates: computed(() => {
    const result: Record<string, string[]> = {}
    selected.value.forEach((entry) => {
      const [roomId, date] = entry.split('_')
      if (!result[roomId]) result[roomId] = []
      result[roomId].push(date)
    })
    return result
  }),
  clearSelection: () => {
    selected.value.clear()
    logSelectedRooms()
  },
})
</script>

<style>
.selecting-box {
  background: rgba(131, 148, 226, 0.2);
  border: 1px solid #6495ed;
  border-radius: 4px;
}
</style>
