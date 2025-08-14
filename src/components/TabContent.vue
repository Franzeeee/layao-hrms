<template>
  <!-- Booking Summary Table -->
  <div class="overflow-x-auto mt-8 text-gray-700">
    <table class="w-full border border-gray-300 text-sm text-left">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-3 py-2 border"> </th>
          <th class="px-3 py-2 border">Room/Addition Services</th>
          <th class="px-3 py-2 border">Checkin - Checkout</th>
          <th class="px-3 py-2 border">Capacity</th>
          <th class="px-3 py-2 border">Night</th>
          <th class="px-3 py-2 border">Quantity</th>
          <th class="px-3 py-2 border">Deposit Payment</th>
          <th class="px-3 py-2 border">Gross Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="index" class="border-t">
          <td
            class="px-3 py-2 border text-center cursor-pointer hover:bg-red-600 hover:text-white"
            @click="removeItem(index)"
          >
            ✕
          </td>
          <td class="px-3 py-2 border">{{ item.room }}</td>
          <td class="px-3 py-2 border">{{ item.checkIn }} - {{ item.checkOut }}</td>
          <td class="px-3 py-2 border">{{ item.capacity }}</td>
          <td class="px-3 py-2 border text-center">{{ item.nights }}</td>
          <td class="px-3 py-2 border text-center">{{ item.quantity }}</td>
          <td class="px-3 py-2 border text-center">{{ item.deposit }}</td>
          <td class="px-3 py-2 border text-right">₱{{ formatCurrency(item.total) }}</td>
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

// Cart data (can later come from props or store)
const cartItems = ref([
  {
    room: 'Barkadahan Room 1',
    checkIn: 'August 3, 2025',
    checkOut: 'August 4, 2025',
    capacity: '1 adult 0 childs',
    nights: 1,
    quantity: 1,
    deposit: 'Disable',
    total: 1400,
  },
])

// Currency formatter
const formatCurrency = (value: number): string => {
  return value.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

// Subtotal & grand total
const subTotal = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.total, 0)
})
const grandTotal = computed(() => subTotal.value) // you can add tax or fees later

// Remove item
const removeItem = (index: number) => {
  cartItems.value.splice(index, 1)
}
</script>
