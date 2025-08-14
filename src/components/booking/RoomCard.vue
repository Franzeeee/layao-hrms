<template>
  <div class="room-card md:w-50 lg:w-72 rounded-xl overflow-hidden shadow-md min-h-48">
    <div class="image-container relative">
      <img src="/images/beach-villa-suite.jpg" alt="Room" class="w-full min-h-48 object-cover" />
      <div
        class="overlay absolute bottom-0 left-0 w-full bg-black bg-opacity-40 text-white p-4 box-border"
      >
        <h3 class="m-0 text-lg font-semibold">{{ props.room.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  room: {
    id: string
    name: string
  }
}>()
</script>
