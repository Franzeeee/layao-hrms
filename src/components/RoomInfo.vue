<script setup lang="ts">
import RoomTitle from '../components/RoomTitle.vue'
import RoomDescription from '../components/RoomDescription.vue'
import AmenitiesList from '../components/AmenitiesList.vue'

const { title, description, descriptionItems, amenities } = defineProps<{
  title: string
  description: string
  descriptionItems: { icon?: string; text: string }[]
  amenities: string[]
}>()
</script>

<template>
  <div class="flex flex-col items-start justify-start gap-6">
    <RoomTitle :title="title" />
    <RoomDescription :text="description" :items="descriptionItems" />
    <AmenitiesList :items="amenities" />
  </div>
</template>
