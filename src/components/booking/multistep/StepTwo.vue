<template>
  <div class="flex w-full flex-col lg:flex-row gap-10 lg:gap-5">
    <!-- Left side: 2/3 width -->
    <div class="lg:w-2/3 w-full">
      <TabContainer
        :tabs="[
          { label: 'Reservation Summary', slot: 'summary' },
          { label: 'Rooms Information', slot: 'rooms' },
        ]"
      >
        <template #summary>
          <TabContent />
        </template>
        <template #rooms>
          <div class="p-0">
            <RoomCarousel />
          </div>
        </template>
      </TabContainer>
    </div>
    <!-- Right side: 1/3 width -->
    <div class="lg:w-1/3 w-full flex flex-col gap-4">
      <!-- Add your content for the right side here -->
      <div class="text-gray-600 rounded-xl min-h-48 flex items-center justify-center">
        <InformationForm />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import TabContainer from '@/components/TabContainer.vue'
import TabContent from '@/components/TabContent.vue'
import RoomCarousel from '@/components/booking/booking-summary/RoomCarousel.vue'
import InformationForm from '@/components/booking/booking-summary/InformationForm.vue'
</script>
