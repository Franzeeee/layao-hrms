<template>
  <!-- Music button -->
  <div
    class="fixed bottom-6 right-6 w-16 h-16 flex items-center justify-center rounded-full shadow-xl z-50 cursor-pointer transition-transform hover:scale-110 group"
    @click="toggleMusic"
    title="Toggle Music"
    style="background: linear-gradient(135deg, rgb(196, 161, 100) 70%, #fffbe6 100%)"
  >
    <i
      class="fas fa-music text-2xl text-white relative z-10 drop-shadow-lg"
      :class="{ 'animate-spin-slow': isPlaying }"
      style="text-shadow: 0 2px 8px rgba(196, 161, 100, 0.7)"
    ></i>
  </div>

  <!-- Hidden video player -->
  <video
    ref="musicVideo"
    src="/videos/layao.mp4"
    preload="auto"
    autoplay
    loop
    muted
    style="display: none"
  ></video>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isPlaying = ref(false)
const musicVideo = ref<HTMLVideoElement | null>(null)

function toggleMusic() {
  if (!musicVideo.value) return
  if (isPlaying.value) {
    musicVideo.value.pause()
    isPlaying.value = false
  } else {
    musicVideo.value.play()
    isPlaying.value = true
  }
}

function enableSound() {
  if (!musicVideo.value) return
  musicVideo.value.muted = false
  musicVideo.value.play()
  isPlaying.value = true
  removeInteractionListeners()
}

function removeInteractionListeners() {
  document.removeEventListener('click', enableSound)
  document.removeEventListener('keydown', enableSound)
  document.removeEventListener('scroll', enableSound)
}

onMounted(() => {
  if (!musicVideo.value) return
  // Autoplay muted works immediately
  musicVideo.value.muted = true
  musicVideo.value.play().then(() => {
    isPlaying.value = true
  })

  document.addEventListener('click', enableSound, { once: true })
  document.addEventListener('keydown', enableSound, { once: true })
  document.addEventListener('scroll', enableSound, { once: true })
})
</script>

<style>
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
