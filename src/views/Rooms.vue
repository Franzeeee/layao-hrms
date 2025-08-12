<script setup lang="ts">
import FeatureSection from '@/components/layout/FeatureSection.vue'
import RoomChecker from '@/components/RoomChecker.vue'
import HeroBannerBreadcrumbs from '@/components/layout/HeroBannerBreadcrumbs.vue'
import RoomTypeCard from '../components/RoomTypeCard.vue'
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
      title="LaYao Executive Suite"
      description="An elegant fusion between European and Filipino design, this two-level villa is provided with two balconies and has the perfect panoramic view of the spectacular rock formations of the island. The ground floor has 1 queen sized bed, 1 queen-sized pull-out bed, and the loft has 1 single bed. Ideal for families and larger groups."
      img="/images/beach-villa-suite.jpg"
    />

    <RoomTypeCard
      title="Barkadahan Room"
      description="An elegant fusion between European and Filipino design, this two-level villa is provided with two balconies and has the perfect panoramic view of the spectacular rock formations of the island. The ground floor has 1 queen sized bed, 1 queen-sized pull-out bed, and the loft has 1 single bed. Ideal for families and larger groups."
      img="/images/beach-villa-suite.jpg"
    />

    <RoomTypeCard
      title="Superior Deluxe Room"
      description="An elegant fusion between European and Filipino design, this two-level villa is provided with two balconies and has the perfect panoramic view of the spectacular rock formations of the island. The ground floor has 1 queen sized bed, 1 queen-sized pull-out bed, and the loft has 1 single bed. Ideal for families and larger groups."
      img="/images/beach-villa-suite.jpg"
    />

    <RoomTypeCard
      title="Family Suite Room"
      description="An elegant fusion between European and Filipino design, this two-level villa is provided with two balconies and has the perfect panoramic view of the spectacular rock formations of the island. The ground floor has 1 queen sized bed, 1 queen-sized pull-out bed, and the loft has 1 single bed. Ideal for families and larger groups."
      img="/images/beach-villa-suite.jpg"
    />

    <RoomTypeCard
      title="Deluxe Room"
      description="An elegant fusion between European and Filipino design, this two-level villa is provided with two balconies and has the perfect panoramic view of the spectacular rock formations of the island. The ground floor has 1 queen sized bed, 1 queen-sized pull-out bed, and the loft has 1 single bed. Ideal for families and larger groups."
      img="/images/beach-villa-suite.jpg"
    />
  </FeatureSection>
</template>
