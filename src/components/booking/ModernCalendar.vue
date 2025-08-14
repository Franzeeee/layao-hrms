<template>
  <div class="w-full max-w-sm mx-auto select-none">
    <div class="flex justify-between items-center mb-4">
      <button
        @click="prevMonth"
        class="p-2 text-gray-600 hover:text-primary-500 cursor-pointer hover:text-gray-900"
      >
        ‹
      </button>
      <span class="font-medium text-gray-800">{{ monthYear }}</span>
      <button
        @click="nextMonth"
        class="p-2 text-gray-600 hover:text-primary-500 cursor-pointer hover:text-gray-900"
      >
        ›
      </button>
    </div>

    <div class="grid grid-cols-7 text-xs text-center text-gray-500 mb-2">
      <span v-for="(day, index) in weekDays" :key="index">{{ day }}</span>
    </div>

    <div class="grid grid-cols-7 text-sm text-center">
      <div v-for="blank in blankDays" :key="'b' + blank" class="p-2"></div>

      <button
        v-for="date in daysInMonth"
        :key="date"
        class="p-2 rounded-lg hover:bg-primary-100"
        :class="[
          isSelectedStart(date) || isSelectedEnd(date) ? 'bg-blue-500 text-white font-bold' : '',
          isInHoverRange(date) ? 'bg-blue-100 text-blue-800' : '',
          isInRange(date) ? 'bg-blue-50 text-blue-700' : '',
          isToday(date) ? 'bg-gray-200 text-gray-900' : '',
        ]"
        @mousedown.prevent="startDrag(date)"
        @mouseenter="onHover(date)"
        @mouseup.prevent="endDrag(date)"
      >
        {{ date }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const emit = defineEmits(['select'])

const today = dayjs()
const current = ref(dayjs())

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const monthYear = computed(() => current.value.format('MMMM YYYY'))
const daysInMonth = computed(() =>
  Array.from({ length: current.value.daysInMonth() }, (_, i) => i + 1),
)
const blankDays = computed(() => {
  const firstDayOfMonth = current.value.startOf('month').day()
  return Array.from({ length: firstDayOfMonth })
})

// State
const rangeStart = ref<string | null>(null)
const rangeEnd = ref<string | null>(null)
const isDragging = ref(false)
const hoverDate = ref<string | null>(null)

const getDateString = (date: number) => current.value.date(date).format('YYYY-MM-DD')

const isToday = (date: number) => getDateString(date) === today.format('YYYY-MM-DD')

const isSelectedStart = (date: number) => rangeStart.value === getDateString(date)
const isSelectedEnd = (date: number) => rangeEnd.value === getDateString(date)

const isInRange = (date: number) => {
  const d = getDateString(date)
  if (rangeStart.value && rangeEnd.value) {
    return dayjs(d).isAfter(rangeStart.value) && dayjs(d).isBefore(rangeEnd.value)
  }
  return false
}

const isInHoverRange = (date: number) => {
  const d = getDateString(date)
  if (isDragging.value && rangeStart.value && hoverDate.value) {
    const start = dayjs(rangeStart.value)
    const hover = dayjs(hoverDate.value)
    if (hover.isAfter(start)) {
      return dayjs(d).isAfter(start) && dayjs(d).isBefore(hover)
    } else {
      return dayjs(d).isAfter(hover) && dayjs(d).isBefore(start)
    }
  }
  return false
}

// Events for drag
const startDrag = (date: number) => {
  rangeStart.value = getDateString(date)
  rangeEnd.value = null
  hoverDate.value = null
  isDragging.value = true
}

const onHover = (date: number) => {
  if (isDragging.value) {
    hoverDate.value = getDateString(date)
  }
}

const endDrag = (date: number) => {
  if (!isDragging.value) return
  const end = getDateString(date)

  if (rangeStart.value) {
    if (dayjs(end).isBefore(rangeStart.value)) {
      rangeEnd.value = rangeStart.value
      rangeStart.value = end
    } else {
      rangeEnd.value = end
    }
  }

  isDragging.value = false
  hoverDate.value = null

  emit('select', {
    start: rangeStart.value,
    end: rangeEnd.value,
  })
}

const nextMonth = () => {
  current.value = current.value.add(1, 'month')
}
const prevMonth = () => {
  current.value = current.value.subtract(1, 'month')
}
</script>
