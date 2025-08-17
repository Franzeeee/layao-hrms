<template>
  <!-- Booking Summary Table -->
  <div class="overflow-x-auto mt-8 text-gray-700">
    <table class="w-full border border-gray-300 text-sm text-left">
      <thead class="bg-gray-100">
        <tr>
          <!-- <th class="px-3 py-2 border"></th> -->
          <th class="px-3 py-2 border">Room/Addition Services</th>
          <th class="px-3 py-2 border">Checkin - Checkout</th>
          <th class="px-3 py-2 border">No. of Nights</th>
          <th class="px-3 py-2 border">Capacity</th>
          <th class="px-3 py-2 border">Quantity</th>
          <th class="px-3 py-2 border">Room Rate</th>
          <th class="px-3 py-2 border">Room Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in bookingDetails.bookedRooms" :key="index" class="border-t">
          <!-- <td class="px-3 py-2 border text-center cursor-pointer hover:bg-red-600 hover:text-white">
            ✕
          </td> -->
          <td class="px-3 py-2 border">{{ item.roomName }}</td>
          <td class="px-3 py-2 border">
            {{ formatDate(item.startDate) }} - {{ formatDate(item.endDate) }}
          </td>
          <td class="px-3 py-2 border">
            {{ calculateNights(item.startDate, item.endDate) }} Night(s)<span
              v-if="calculateNights(item.startDate, item.endDate) > 1"
              >s</span
            >
          </td>
          <td class="border" :class="item.roomName === 'Barkadahan' ? 'px-1' : 'px-3 py-2'">
            <template v-if="item.roomName === 'Barkadahan'">
              <select v-model="capacityForBarkadahan" class="w-full px-1 py-1 outline-0">
                <option v-for="n in 14" :key="n" :value="n + 7">{{ n + 7 }} Pax</option>
              </select>
            </template>
            <template v-else>
              {{ rooms[index]?.roomCapacity }}
            </template>
          </td>
          <td class="px-3 py-2 border text-center">
            <div class="flex items-center justify-center">
              <i
                class="fas fa-minus"
                :class="
                  (rooms[index].quantity ?? 1) <= 1
                    ? 'cursor-not-allowed text-gray-400'
                    : 'cursor-pointer text-gray-600 hover:text-red-600'
                "
                role="button"
                :aria-disabled="(rooms[index].quantity ?? 1) <= 1"
                @click="
                  (rooms[index].quantity ?? 1) > 1 &&
                  (rooms[index].quantity = (rooms[index].quantity ?? 1) - 1)
                "
              ></i>
              <span class="w-10 text-center">{{ rooms[index].quantity ?? 1 }}</span>
              <i
                class="fas fa-plus"
                :class="
                  (rooms[index].quantity ?? 1) >= (rooms[index].max_rooms ?? 1)
                    ? 'cursor-not-allowed text-gray-400'
                    : 'cursor-pointer text-gray-600 hover:text-green-600'
                "
                role="button"
                :aria-disabled="(rooms[index].quantity ?? 1) >= (rooms[index].max_rooms ?? 1)"
                @click="
                  (rooms[index].quantity ?? 1) < (rooms[index].max_rooms ?? 1) &&
                  (rooms[index].quantity = (rooms[index].quantity ?? 1) + 1)
                "
              ></i>
            </div>
          </td>
          <td class="px-3 py-2 border text-center">₱{{ formatCurrency(item?.rate || 0) }}</td>
          <td class="px-3 py-2 border text-right">
            ₱{{
              formatCurrency(
                calculateNights(item.startDate, item.endDate) *
                  (item.rate ?? 0) *
                  (item.roomName === 'Barkadahan' ? capacityForBarkadahan : 1),
              )
            }}
          </td>
        </tr>

        <tr v-if="bookingDetails.additionalJoiners > 0" class="border-t">
          <!-- <td class="px-3 py-2 border text-center cursor-pointer hover:bg-red-600 hover:text-white">
            ✕
          </td> -->
          <td class="px-3 py-2 border">Additional Person</td>
          <td class="px-3 py-2 border">--</td>
          <td class="border px-3 py-2">--</td>
          <td class="border px-3 py-2">1 Pax</td>
          <td class="px-3 py-2 border text-center">{{ bookingDetails.additionalJoiners }}</td>
          <td class="px-3 py-2 border text-center">₱{{ formatCurrency(999) }}</td>
          <td class="px-3 py-2 border text-right">
            ₱{{
              formatCurrency(
                calculateNights(
                  bookingDetails.bookedRooms[0].startDate,
                  bookingDetails.bookedRooms[0].endDate,
                ) *
                  999 *
                  bookingDetails.additionalJoiners,
              )
            }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Totals -->
    <div class="mt-4 text-sm w-full max-w-md ml-auto">
      <div class="flex justify-between border-t pt-2">
        <span class="font-medium">Sub Total</span>
        <span class="font-medium">₱{{ formatCurrency(subTotal) }}</span>
      </div>
      <div class="flex justify-between border-t pt-2">
        <span class="font-medium">Grand Total</span>
        <span class="font-medium">₱{{ formatCurrency(grandTotal) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBookingDetails } from '@/store/bookingDetails'
import { MOCK_ROOM_TYPES } from '@/data/Rooms'

const bookingDetails = useBookingDetails()
const roomTypes = MOCK_ROOM_TYPES
const capacityForBarkadahan = ref(bookingDetails.paxForBarkadahan || 8)

// Ensure bookingDetails.roomQuantity exists and is aligned with bookedRooms
if (!Array.isArray((bookingDetails as any).roomQuantity)) {
  ;(bookingDetails as any).roomQuantity = []
}
bookingDetails.bookedRooms.forEach((_, idx) => {
  if ((bookingDetails as any).roomQuantity[idx] == null) {
    ;(bookingDetails as any).roomQuantity[idx] = 1
  }
})

const rooms = ref(
  bookingDetails.bookedRooms.map((room, idx) => {
    const type = roomTypes.find((rt) => rt.id === room.roomId)
    const obj: any = {
      ...room,
      roomType: type,
      roomCapacity: type?.capacity ?? '',
      pax: type?.pax ?? null,
      max_rooms: type?.max_rooms ?? 1,
      // quantity will be proxied to bookingDetails.roomQuantity[idx]
    }

    Object.defineProperty(obj, 'quantity', {
      get() {
        return (bookingDetails as any).roomQuantity[idx] ?? 1
      },
      set(value: number) {
        ;(bookingDetails as any).roomQuantity[idx] = value
      },
      enumerable: true,
      configurable: true,
    })

    return obj
  }),
)

const roomJoinerTotal = computed(() => 999 * bookingDetails.additionalJoiners)
// Subtotal & grand total
const subTotal = computed(() => {
  return bookingDetails.bookedRooms.reduce((acc, item, idx) => {
    const nights = calculateNights(item.startDate, item.endDate)
    const rate = item.rate ?? 0
    let total = nights * rooms.value[idx].quantity * rate
    if (item.roomName === 'Barkadahan') {
      // Use selected capacity for Barkadahan
      total *= capacityForBarkadahan.value
    }
    return acc + total + roomJoinerTotal.value
  }, 0)
})
const grandTotal = computed(() => subTotal.value) // you can add tax or fees later

bookingDetails.total = grandTotal.value

// Remove item
// const removeItem = (index: number) => {
//   cartItems.value.splice(index, 1)
// }

function calculateNights(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())
  const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())

  const msInDay = 24 * 60 * 60 * 1000
  const diffDays = Math.round((utcEnd - utcStart) / msInDay)

  return diffDays > 1 ? diffDays : 1
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', // abbreviated month, e.g., "Jul"
    day: '2-digit', // ensures two digits, e.g., "05"
    year: 'numeric', // full year, e.g., "2002"
  }).format(date)
}

// Currency formatter
const formatCurrency = (value: number): string => {
  return value.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function nightsCalculator(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())
  const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())

  const msInDay = 24 * 60 * 60 * 1000
  const diffDays = Math.round((utcEnd - utcStart) / msInDay)

  return diffDays > 1 ? diffDays : 0
}
</script>
