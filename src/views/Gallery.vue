<script setup lang="ts">
import HeroBannerBreadcrumbs from '@/components/layout/HeroBannerBreadcrumbs.vue'
import FeatureSection from '@/components/layout/FeatureSection.vue'
import { ref } from 'vue'

// vue3-carousel
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

// vue-easy-lightbox
import Lightbox from 'vue-easy-lightbox'

const images = ref<string[]>(Array.from({ length: 21 }, (_, i) => `/images/gallery/g${i}.JPG`))

// Lightbox state
const visible = ref(false)
const index = ref(0)

const openLightbox = (i: number) => {
  index.value = i
  visible.value = true
}
</script>

<template>
  <HeroBannerBreadcrumbs
    title="Our Gallery"
    :breadcrumbs="[{ text: 'Home', link: '/' }, { text: 'Gallery' }]"
    backgroundImage="/images/hero-img.jpg"
  />

  <FeatureSection
    title="Paradise Through Our Lens"
    description="Step into the beauty of LaYao Beach Resort through our carefully curated gallery. From breathtaking sunsets and crystal-clear waters to our elegant accommodations and memorable guest experiences — discover why our resort is a paradise worth visiting."
    :cols="1"
  >
    <!-- Main Hero Carousel -->
    <Carousel
      :items-to-show="1"
      :wrap-around="true"
      :transition="600"
      :autoplay="3000"
      pause-autoplay-on-hover
      class="w-full max-w-5xl mx-auto cursor-pointer"
    >
      <Slide v-for="(img, i) in images" :key="i">
        <div class="p-2" @click="openLightbox(i)">
          <img
            :src="img"
            :alt="`Resort Photo ${i + 1}`"
            class="rounded-2xl object-cover w-full h-[500px] md:h-[650px] shadow-xl hover:scale-[1.02] transition-transform"
          />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>

    <!-- Thumbnails -->
    <div class="grid grid-cols-3 md:grid-cols-6 gap-3 mt-6 max-w-5xl mx-auto">
      <div
        v-for="(img, i) in images"
        :key="'thumb-' + i"
        class="overflow-hidden rounded-xl cursor-pointer group"
        @click="openLightbox(i)"
      >
        <img
          :src="img"
          :alt="`Thumbnail ${i + 1}`"
          class="w-full h-28 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </div>

    <!-- Zoom-In Modal Carousel -->
    <Lightbox
      v-if="visible"
      :visible="visible"
      :imgs="images"
      :index="index"
      @hide="visible = false"
    />
  </FeatureSection>
</template>
