<template>
  <div
    class="fixed bottom-6 right-6 w-16 h-16 flex items-center justify-center rounded-full shadow-xl z-50 cursor-pointer transition-transform hover:scale-110 group"
    @click="toggleMusic"
    title="Toggle Music"
    style="background: linear-gradient(135deg, rgb(196, 161, 100) 70%, #fffbe6 100%)"
  >
    <span
      class="absolute inset-0 rounded-full transition"
      style="background: rgba(196, 161, 100, 0.12)"
    ></span>
    <i
      class="fas fa-music text-2xl text-white relative z-10 drop-shadow-lg"
      :class="{ 'animate-spin-slow': isPlaying }"
      style="text-shadow: 0 2px 8px rgba(196, 161, 100, 0.7)"
    ></i>
    <!-- Animated pulse ring -->
    <span
      v-if="isPlaying"
      class="absolute inset-0 rounded-full border-4 animate-pulse pointer-events-none"
      style="border-color: rgba(196, 161, 100, 0.5); z-index: 0"
    ></span>
    <!-- Hidden iframe for music -->
    <iframe
      width="0"
      height="0"
      :src="iframeSrc"
      frameborder="0"
      allow="autoplay"
      style="position: absolute; opacity: 0; pointer-events: none"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isPlaying = ref(false)
const iframeSrc = ref(
  'https://www.youtube.com/embed/AGSjWQw6uRQ?autoplay=1&mute=1&loop=1&playlist=AGSjWQw6uRQ',
)

function toggleMusic() {
  if (isPlaying.value) {
    // Pause by clearing src
    iframeSrc.value = ''
    isPlaying.value = false
  } else {
    // Play unmuted
    iframeSrc.value =
      'https://www.youtube.com/embed/AGSjWQw6uRQ?autoplay=1&mute=0&loop=1&playlist=AGSjWQw6uRQ'
    isPlaying.value = true
  }
}
</script>

<style>
/* Slow spin animation */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 4s linear infinite;
}
</style>
