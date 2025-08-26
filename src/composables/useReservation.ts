// composables/useReservation.js
import { ref, reactive, provide, inject } from 'vue'
import { useBooking } from './useBooking'
import { useBookingDetails } from '@/store/bookingDetails'

// unique key for provide/inject
const ReservationKey = Symbol('Reservation')

export function provideReservation() {
  // reservation state
  const reservation = reactive({
    additionalJoiner: useBookingDetails().additionalJoiners,
    firstname: useBookingDetails().firstname,
    lastname: useBookingDetails().lastname,
    email: useBookingDetails().email,
    phone: useBookingDetails().phone,
    notes: useBookingDetails().notes,
    bookedRooms: useBooking().bookings,
    total: useBookingDetails().total,
    addOnTotal: useBookingDetails().addOnTotal,
    roomQuantity: [] as Number[],
  })

  function setTotals(total: number, addOnTotal: number) {
    reservation.total = total
    reservation.addOnTotal = addOnTotal
  }

  function setRoomQuantity(quantity: number[]) {
    reservation.roomQuantity = quantity
  }

  provide(ReservationKey, { reservation, setTotals, setRoomQuantity })

  return { reservation, setTotals, setRoomQuantity }
}

export function useReservation() {
  const context = inject(ReservationKey)
  if (!context) {
    throw new Error('useReservation must be used within a provider')
  }
  return context
}
