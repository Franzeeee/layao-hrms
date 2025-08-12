<template>
  <div>
    <header
      class="flex items-center flex-col justify-between pb-0 pt-2 bg-white relative text-black"
    >
      <div class="w-full flex items-center justify-center border-b-[1px] border-gray-100">
        <!-- Logo -->
        <div
          class="bg-transparent w-full h-18 md:px-3 flex items-center justify-between max-w-[1110px] lg:px-10 xl:px-3"
        >
          <Logo />
          <HeaderContact />
        </div>
      </div>

      <!-- Navigation Links (desktop) -->
      <Navigation />
      <!-- Call-to-Action Button (desktop) -->
    </header>
  </div>
</template>

<script setup lang="ts">
import Logo from '../Logo.vue'
import Navigation from '@/components/layout/Navigation.vue'
import HeaderContact from '@/components/layout/HeaderContact.vue'
</script>
