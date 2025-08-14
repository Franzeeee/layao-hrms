import { ref } from 'vue'

export interface RoomBooking {
  roomId: number
  roomName: string
  startDate: string
  endDate: string
  dates: string[]
  guests?: number
}

const bookingRef = ref<RoomBooking[]>([])

export function useBooking() {
  const bookings = bookingRef

  function addBooking(
    roomId: number,
    roomName: string,
    startDate: string,
    endDate: string,
    dates: string[],
    guests?: number,
  ) {
    const existing = bookings.value.find((b) => b.roomId === roomId)
    if (existing) {
      Object.assign(existing, { roomName, startDate, endDate, dates, guests })
    } else {
      bookings.value.push({ roomId, roomName, startDate, endDate, dates, guests })
    }
  }

  function updateRoomDates(
    roomId: number,
    roomName: string,
    start: string,
    end: string,
    dates: string[],
    guests?: number,
  ) {
    const index = bookings.value.findIndex((b) => b.roomId === roomId && b.roomName === roomName)

    if (index !== -1) {
      bookings.value[index] = { roomId, roomName, startDate: start, endDate: end, dates, guests }
    } else {
      console.warn('Booking not found for:', { roomId, roomName })
    }
  }

  function removeBooking(roomId: number) {
    const index = bookings.value.findIndex((b) => b.roomId === roomId)
    if (index !== -1) {
      bookings.value.splice(index, 1)
    } else {
      console.warn('Booking not found for roomId:', roomId)
    }
  }

  function clearBooking() {
    bookings.value = []
  }

  return {
    bookings,
    addBooking,
    updateRoomDates,
    removeBooking,
    clearBooking,
  }
}
