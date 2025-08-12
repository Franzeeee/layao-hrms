<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Props: array of image URLs
const props = defineProps<{
  images: string[]
}>()

// Clone the first slide(s) for smooth loop
const slides = [...props.images, ...props.images.slice(0, 1)]

const current = ref(0)
let timer: number | undefined

const slideCount = slides.length

onMounted(() => {
  timer = window.setInterval(() => {
    nextSlide()
  }, 2500)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})

function nextSlide() {
  current.value += 1
  // When reach the cloned slide, reset to real first slide instantly (no animation)
  if (current.value === slideCount) {
    // small delay to let the last transition finish, then jump back
    setTimeout(() => {
      current.value = 0
    }, 50)
  }
}
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <div
      class="flex h-full"
      :style="{
        width: `${slides.length * 100}%`,
        transform: `translateX(-${current * (100 / slides.length)}%)`,
        transition: current === slideCount ? 'none' : 'transform 0.7s ease-in-out',
      }"
    >
      <div
        v-for="(img, idx) in slides"
        :key="idx"
        class="flex-shrink-0 w-full h-full"
        :style="{ width: `${100 / slides.length}%` }"
      >
        <img :src="img" alt="" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>
