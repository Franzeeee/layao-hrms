<script setup lang="ts">
import HeroBanner from '../components/HeroBanner.vue'
import RoomChecker from '../components/RoomChecker.vue'
import FeatureSection from '@/components/layout/FeatureSection.vue'
import ProductCard from '@/components/ProductCard.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import InformationCard from '../components/InformationCard.vue'
import HotelMap from '@/components/HotelMap.vue'
import { MOCK_DATA_IMAGES } from '@/data/ImageCarousel'
import { MOCK_ROOM_TYPES } from '@/data/Rooms'

const images: string[] = MOCK_DATA_IMAGES.map((image) => image.url)
const rooms = MOCK_ROOM_TYPES.slice(0, 3)
</script>

<!-- src/pages/HomePage.vue -->
<template>
  <title>Hello</title>
  <HeroBanner
    title="Welcome to Layao"
    subtitle="Relax and Embrace Nature"
    buttonText="Explore Now"
    backgroundImage="/images/hero-img.jpg"
  />

  <!-- Add Room Checker below hero -->
  <RoomChecker />

  <FeatureSection
    title="Discover Our Unique Rooms"
    description="Enjoy your stay at our finest rooms. To accommodate the guests who want to have an overnight stay, the resort has 4 beach villas and 15 hotel rooms to choose from, at different prices according to the level of standard of accommodation."
    :disableGrid="true"
    >
    <!-- custom responsive grid just for rooms -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
      <ProductCard
      v-for="room in rooms"
      :id="room.id"
      :key="room.id"
      :name="room.type"
      :type="room.type"
      :price="`₱${room.rate}.00`"
      :image="room.images?.[0]"
      class="w-full"
      />
    </div>

    <!-- button row stays below -->
    <div class="w-full col-span-3 p-2 grid items-center">
      <RouterLink to="/rooms">
        <button
          class="w-fit m-auto text-center text-sm text-[#c4a164] cursor-pointer border border-[#c4a164] hover:bg-[#c4a164] hover:text-white transition-all duration-300 ease-in-out p-2 px-3 uppercase"
        >
          View all rooms
        </button>
      </RouterLink>
    </div>
  </FeatureSection>


  <FeatureSection
    title="OUR AWESOME SERVICES"
    description="Enjoy your stay at our finest rooms. To accommodate the guests who want to have an overnight stay, the resort has 4 beach villas and 15 hotel rooms to choose from, at different prices according to the level of standard of accommodation."
    bg="bg-gray-100"
  >
    <ImageCarousel :images="images" />
    <div class="grid grid-row-4 gap-4 w-full">
      <InformationCard
        icon="fa-solid fa-person-swimming"
        title="Infinity Pool"
        description="Relax and unwind in our stunning infinity pool with breathtaking views."
      />
      <InformationCard
        icon="fa-solid fa-utensils"
        title="Restaurant"
        description="From every day meals to snacks and desserts, Salud would surely satisfy the taste that you have been looking for."
      />
      <InformationCard
        icon="fa-solid fa-champagne-glasses"
        title="Function Rooms"
        description="Share your events with us. Our function hall is ideal for wedding receptions, birthdays, and seminars."
      />
      <InformationCard
        icon="fa-solid fa-umbrella-beach"
        title="Beach Cottages"
        description="Enjoy your meal at the Beach cottage with a breathtaking view of the sea rock formations infront of you."
      />
    </div>
  </FeatureSection>
  <HotelMap />
</template>
