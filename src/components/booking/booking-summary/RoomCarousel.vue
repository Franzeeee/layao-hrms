<template>
  <div class="w-full relative overflow-hidden" ref="container">
    <!-- Inner Carousel Wrapper -->
    <div
      class="flex transition-transform duration-300 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * containerWidth}px)` }"
    >
      <div v-for="room in rooms" :key="room.id" class="flex-shrink-0 w-full">
        <div class="rounded-xl p-2 text-center">
          <RoomGallery v-bind="roomGalleryProps" />
          <RoomInfo v-bind="roomInfoProps" />
        </div>
      </div>
    </div>

    <!-- Prev Button -->
    <button
      @click="scrollPrev"
      class="absolute left-1 top-1/2 -translate-y-1/2 bg-white w-10 h-10 shadow rounded-full z-10 flex items-center justify-center cursor-pointer"
      style="aspect-ratio: 1/1"
    >
      <i class="fas fa-chevron-left text-black"></i>
    </button>

    <!-- Next Button -->
    <button
      @click="scrollNext"
      class="absolute right-1 top-1/2 -translate-y-1/2 bg-white w-10 h-10 shadow rounded-full z-10 flex items-center justify-center cursor-pointer"
      style="aspect-ratio: 1/1"
    >
      <i class="fas fa-chevron-right text-black"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import RoomGallery from '@/components/room_details/RoomGalery.vue'
import RoomInfo from '@/components/room_details/RoomInfo.vue'

const currentIndex = ref(0)
const container = ref<HTMLDivElement | null>(null)
const containerWidth = ref(0)

const rooms = [
  { id: '1', name: 'Deluxe Room' },
  { id: '2', name: 'Standard Room' },
  { id: '3', name: 'Suite' },
  { id: '4', name: 'Presidential Room' },
  { id: '5', name: 'Economy Room' },
]

const roomGalleryProps = {
  images: ['/images/room-sample.jpg', '/images/carousel1.jpg'],
}

const roomInfoProps = {
  title: 'Beach Villa Suite',
  description: `An elegant fusion between European and Filipino design, this two-level villa is provided with two balconies and has the perfect panoramic view of the spectacular rock formations of the island. The ground floor has 1 queen sized bed, 1 queen-sized pull-out bed, and the loft has 1 single bed. Ideal for families and larger groups.`,
  amenities: [
    'Breakfast for 5 persons',
    'Tea & Coffee Tray',
    'Bottled Water',
    'Mini Bar',
    'Cable TV',
    'Air Conditioner',
    'Private Bathroom',
    'Hot & Cold Shower',
    'Balcony',
    'Slippers',
    'Toiletries',
  ],
  descriptionItems: [
    { text: 'Air Conditioning', icon: 'fa-solid fa-snowflake' },
    { text: 'WiFi', icon: 'fa-solid fa-wifi' },
    { text: 'Private Bath', icon: 'fa-solid fa-bath' },
  ],
}

const updateWidth = () => {
  containerWidth.value = container.value?.offsetWidth || 0
}

const scrollNext = () => {
  if (currentIndex.value < rooms.length - 1) currentIndex.value++
}
const scrollPrev = () => {
  if (currentIndex.value > 0) currentIndex.value--
}

// Resize listener for responsiveness
onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>
