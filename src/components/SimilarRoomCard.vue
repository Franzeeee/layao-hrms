<script setup lang="ts">
defineProps<{
  rooms: {
    name: string
    image: string
    price: number
  }[]
}>()
</script>

<template>
  <h1 class="text-4xl text-gray-500 font-semibold mt-5 mb-2 text-left">Similar Rooms</h1>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div
      v-for="room in rooms"
      :key="room.name"
      class="border border-[#c4a164] overflow-hidden shadow-xs"
    >
      <img :src="room.image" class="w-full h-40 object-cover" />
      <div class="p-3">
        <h4 class="font-bold text-lg">{{ room.name }}</h4>
        <p class="text-sm text-gray-500">₱{{ room.price.toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>
