<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const selectedIndex = ref(0)
const selectedImage = ref(props.images[0])
const transitionName = ref('slide-left')

// Handle transition direction
const updateImage = (newIndex: number) => {
  transitionName.value = newIndex > selectedIndex.value ? 'slide-left' : 'slide-right'
  selectedIndex.value = newIndex
  selectedImage.value = props.images[newIndex]
}

const handleThumbnailClick = (index: number) => {
  updateImage(index)
}
</script>

<template>
  <div class="room-gallery overflow-hidden">
    <!-- Transition for sliding effect -->
    <Transition :name="transitionName" mode="out-in">
      <img
        :key="selectedImage"
        :src="selectedImage"
        class="w-full mb-4 md:min-h-[400px] lg:min-h-[500px] lg:max-h-[400px] object-cover"
      />
    </Transition>

    <!-- Thumbnails -->
    <div ref="thumbsContainer" class="flex gap-2 overflow-x-auto scrollbar-hide">
      <img
        v-for="(img, index) in props.images"
        :key="index"
        :src="img"
        class="w-30 h-20 object-cover cursor-pointer border"
        :class="{ 'ring-2 ring-blue-400': img === selectedImage }"
        @click="handleThumbnailClick(index)"
      />
    </div>
  </div>
</template>

<style scoped>
/* Slide Left */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s ease;
}

.slide-left-enter-from {
  transform: translateX(10px);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
