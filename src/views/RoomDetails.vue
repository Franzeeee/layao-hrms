<script setup lang="ts">
import FeatureSection from '@/components/layout/FeatureSection.vue'
import RoomChecker from '@/components/RoomChecker.vue'
import HeroBannerBreadcrumbs from '@/components/layout/HeroBannerBreadcrumbs.vue'
import RoomGallery from '@/components/RoomGalery.vue'
import InquiryForm from '@/components/InquiryForm.vue'
import RoomInfo from '@/components/RoomInfo.vue'
import PriceBreakdown from '@/components/PriceBreakdown.vue'
import BookingInformation from '@/components/BookingInformation.vue'
import SimilarRoomCard from '@/components/SimilarRoomCard.vue'
import BookReservationButton from '@/components/BookReservationButton.vue'

const heroBannerProps = {
  title: 'Our Rooms',
  breadcrumbs: [
    { text: 'Home', link: '/' },
    { text: 'Rooms', link: '/rooms' },
    { text: 'Room Details' },
  ],
  backgroundImage: '/images/hero-img.jpg',
}

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

const featureSectionProps = {
  cols: 1,
  withWave: false,
}
</script>
<template>
  <HeroBannerBreadcrumbs v-bind="heroBannerProps" />
  <RoomChecker />
  <FeatureSection v-bind="featureSectionProps">
    <div class="flex flex-col md:flex-row gap-2 w-full text-black">
      <!-- 2/3 Section -->
      <div class="md:w-2/3 w-full lg:pr-5 flex flex-col gap-10">
        <RoomGallery v-bind="roomGalleryProps" />
        <RoomInfo v-bind="roomInfoProps" />
        <SimilarRoomCard
          :rooms="[
            { name: 'Beach Villa Suite', image: '/images/room-sample.jpg', price: 2000 },
            { name: 'Garden Villa', image: '/images/carousel1.jpg', price: 1800 },
            { name: 'Ocean View Room', image: '/images/room-sample.jpg', price: 2200 },
          ]"
        />
      </div>
      <!-- 1/3 Section -->
      <div class="md:w-1/3 w-full flex flex-col gap-7">
        <InquiryForm />
        <PriceBreakdown :nights="1" :pricePerNight="2000" />
        <BookingInformation />
        <BookReservationButton />
      </div>
    </div>
  </FeatureSection>
</template>
