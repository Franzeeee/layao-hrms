<script setup lang="ts">
interface Breadcrumb {
  text: string
  link?: string
}

interface Props {
  title?: string
  breadcrumbs: Breadcrumb[]
  backgroundImage: string
}

const props = defineProps<Props>()
</script>

<template>
  <section class="relative text-white overflow-hidden">
    <img
      :src="props.backgroundImage"
      alt="Hero background"
      class="w-full h-72 md:h-80 lg:h-96 object-cover"
    />

    <div class="absolute inset-0 bg-black/50"></div>

    <div class="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
      <h1 v-if="props.title" class="text-2xl md:text-3xl font-semibold mb-2">{{ props.title }}</h1>

      <nav class="flex items-center space-x-2 text-sm md:text-base text-gray-300">
        <template v-for="(crumb, index) in props.breadcrumbs" :key="index">
          <template v-if="crumb.link">
            <a :href="crumb.link" class="hover:text-[#c4a164]">{{ crumb.text }}</a>
          </template>
          <template v-else>
            <span>{{ crumb.text }}</span>
          </template>

          <span v-if="index < props.breadcrumbs.length - 1">/</span>
        </template>
      </nav>
    </div>
  </section>
</template>
