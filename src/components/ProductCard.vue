<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    default: '$120/night',
  },
  name: {
    type: String,
    default: 'Room Name',
  },
  type: {
    type: String,
    default: 'Deluxe',
  },
  image: {
    type: String,
    default: '/images/room-sample.jpg',
  },
})
</script>

<template>
  <div class="flex flex-col w-full h-full shadow-sm overflow-hidden bg-white group">
    <div class="relative flex-1 overflow-hidden">
      <img
        :src="props.image || '/images/room-sample.jpg'"
        alt="Room Image"
        class="w-full h-56 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div
        class="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded"
      >
        {{ props.price }}
      </div>
    </div>
    <div
      class="flex justify-between items-center px-4 py-4 border-t lg:flex-row md:flex-col md:gap-2"
    >
      <h3 class="text-lg font-semibold text-gray-500">{{ props.name }}</h3>
      <router-link
        :to="`/rooms/${props.id}`"
        class="text-sm text-[#c4a164] cursor-pointer border px-2 border-[#c4a164] hover:bg-[#c4a164] hover:text-white transition-all duration-300 ease-in-out p-1 uppercase"
      >
        View details
      </router-link>
    </div>
  </div>
</template>
