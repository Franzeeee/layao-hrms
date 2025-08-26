<script setup lang="ts">
import FeatureSection from '@/components/layout/FeatureSection.vue'
import RoomChecker from '@/components/RoomChecker.vue'
import HeroBannerBreadcrumbs from '@/components/layout/HeroBannerBreadcrumbs.vue'
import RoomTypeCard from '../components/RoomTypeCard.vue'
import { MOCK_ROOM_TYPES, type RoomType } from '@/data/Rooms'

const roomTypes: RoomType[] = MOCK_ROOM_TYPES
</script>

<template>
  <HeroBannerBreadcrumbs
    title="Our Rooms"
    :breadcrumbs="[{ text: 'Home', link: '/' }, { text: 'Rooms' }]"
    backgroundImage="/images/hero-img.jpg"
  />

  <RoomChecker />

  <FeatureSection
    title="Our Rooms"
    description="Explore our diverse range of rooms designed for comfort and relaxation. Each room offers unique amenities to enhance your stay."
    :cols="1"
  >
    <RoomTypeCard
      v-for="roomType in roomTypes"
      :key="roomType.id"
      :id="roomType.id"
      :title="roomType.type"
      :description="roomType.description"
      :img="roomType.images && roomType.images.length ? roomType.images[0] : '/images/hero-img.jpg'"
      :capacity="roomType.capacity"
      :rate="roomType.rate"
      :features="roomType.features"
      :inclusions="roomType.inclusions"
    />
  </FeatureSection>
</template>
