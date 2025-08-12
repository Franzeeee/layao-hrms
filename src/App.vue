<template>
  <div class="bg-white">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
  <FooterSection />
  <Music />
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import FooterSection from '@/components/layout/FooterSection.vue'
import Music from './components/Music.vue'
</script>
