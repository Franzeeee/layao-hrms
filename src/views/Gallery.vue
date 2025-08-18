<script setup lang="ts">
import HeroBannerBreadcrumbs from '@/components/layout/HeroBannerBreadcrumbs.vue'
import FeatureSection from '@/components/layout/FeatureSection.vue'
import { ref } from 'vue'

const images = ref<string[]>(Array.from({ length: 22 }, (_, i) => `/images/gallery/g${i}.JPG`))

// Fixed 8-image pattern (col-span / row-span)
const pattern = [
  'col-span-2 row-span-2',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
]
</script>

<template>
  <HeroBannerBreadcrumbs
    title="Our Gallery"
    :breadcrumbs="[{ text: 'Home', link: '/' }, { text: 'Gallery' }]"
    backgroundImage="/images/hero-img.jpg"
  />
  <FeatureSection
    title="Paradise Through Our Lens"
    description="Explore the beauty of our resort through stunning visuals. Our gallery showcases the breathtaking landscapes, luxurious accommodations, and unforgettable experiences that await you at LaYao Beach Resort."
    :cols="1"
  >
    <!-- Mobile: Single column layout -->
    <div class="grid grid-cols-1 gap-4 md:hidden">
      <div
        v-for="(img, index) in images"
        :key="index"
        class="relative overflow-hidden rounded-lg aspect-[4/3]"
      >
        <img :src="img" alt="Gallery Image" class="w-full h-full object-cover rounded-lg" />
      </div>
    </div>

    <!-- Desktop: Masonry pattern layout -->
    <div class="hidden md:grid grid-cols-4 gap-2 auto-rows-[200px] grid-flow-dense">
      <div
        v-for="(img, index) in images"
        :key="index"
        :class="pattern[index % pattern.length] + ' relative overflow-hidden rounded-lg'"
      >
        <img :src="img" alt="Gallery Image" class="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  </FeatureSection>
</template>
