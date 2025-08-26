import { defineStore } from 'pinia'
import { useBooking } from '@/composables/useBooking'

export const useBookingDetails = defineStore('bookingDetails', {
  state: () => ({
    additionalJoiners: 0,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    notes: '',
    bookedRooms: useBooking().bookings,
    total: 0,
    addOnTotal: 0,
    roomQuantity: [],
    paxForBarkadahan: 8,
  }),
  actions: {
    setAdditionalJoiners(count: number) {
      this.additionalJoiners = count
    },
    setFirstname(name: string) {
      this.firstname = name
    },
    setLastname(name: string) {
      this.lastname = name
    },
    setEmail(email: string) {
      this.email = email
    },
    setPhone(phone: string) {
      this.phone = phone
    },
    setNotes(notes: string) {
      this.notes = notes
    },
    resetBookingDetails() {
      this.additionalJoiners = 0
      this.firstname = ''
      this.lastname = ''
      this.email = ''
      this.phone = ''
      this.notes = ''
      this.bookedRooms = []
      this.total = 0
      this.addOnTotal = 0
      this.roomQuantity = []
    },
  },
})
