<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const selectedIndex = ref(0)
const selectedImage = ref(props.images[0])
const transitionName = ref('slide-left')
const thumbsContainer = ref<HTMLDivElement | null>(null)

const updateImage = (newIndex: number) => {
  transitionName.value = newIndex > selectedIndex.value ? 'slide-left' : 'slide-right'
  selectedIndex.value = newIndex
  selectedImage.value = props.images[newIndex]
}

const handleThumbnailClick = (index: number) => {
  updateImage(index)
}

// === DRAG SCROLL LOGIC ===
let isDown = false
let startX = 0
let scrollLeft = 0

const onMouseDown = (e: MouseEvent) => {
  if (!thumbsContainer.value) return
  isDown = true
  thumbsContainer.value.classList.add('cursor-grabbing')
  startX = e.pageX - thumbsContainer.value.offsetLeft
  scrollLeft = thumbsContainer.value.scrollLeft
}

const onMouseLeave = () => {
  isDown = false
  thumbsContainer.value?.classList.remove('cursor-grabbing')
}

const onMouseUp = () => {
  isDown = false
  thumbsContainer.value?.classList.remove('cursor-grabbing')
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDown || !thumbsContainer.value) return
  e.preventDefault()
  const x = e.pageX - thumbsContainer.value.offsetLeft
  const walk = (x - startX) * 1.5 // scroll speed multiplier
  thumbsContainer.value.scrollLeft = scrollLeft - walk
}

// === AUTO SCROLL LOGIC ===
let autoScrollInterval: ReturnType<typeof setInterval> | null = null

const startAutoScroll = () => {
  autoScrollInterval = setInterval(() => {
    let nextIndex = selectedIndex.value + 1
    if (nextIndex >= props.images.length) nextIndex = 0
    updateImage(nextIndex)
  }, 4000)
}

const stopAutoScroll = () => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
    autoScrollInterval = null
  }
}

onMounted(() => {
  if (thumbsContainer.value) {
    thumbsContainer.value.addEventListener('mousedown', onMouseDown)
    thumbsContainer.value.addEventListener('mouseleave', onMouseLeave)
    thumbsContainer.value.addEventListener('mouseup', onMouseUp)
    thumbsContainer.value.addEventListener('mousemove', onMouseMove)
  }
  startAutoScroll()
})

onBeforeUnmount(() => {
  if (thumbsContainer.value) {
    thumbsContainer.value.removeEventListener('mousedown', onMouseDown)
    thumbsContainer.value.removeEventListener('mouseleave', onMouseLeave)
    thumbsContainer.value.removeEventListener('mouseup', onMouseUp)
    thumbsContainer.value.removeEventListener('mousemove', onMouseMove)
  }
  stopAutoScroll()
})
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
    <div
      ref="thumbsContainer"
      class="flex gap-2 overflow-x-auto scrollbar-hide cursor-grab select-none"
    >
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
  transition: all 0.4s ease;
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
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
