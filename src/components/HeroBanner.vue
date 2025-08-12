<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  buttonText?: string
  backgroundImage: string
}

const props = defineProps<Props>()
</script>

<template>
  <section class="relative text-white overflow-hidden max-h-[600px]">
    <img
      :src="props.backgroundImage"
      alt="Hero background"
      class="w-full h-[80vh] object-cover relative lg:max-h-[500px] xl:max-h-[85vh] xl:min-h-[85vh]"
    />

    <div class="absolute inset-0 bg-black/50"></div>

    <div class="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
      <div class="animate-float-in">
        <h2 v-if="props.subtitle" class="text-xl uppercase tracking-wide mb-2">
          {{ props.subtitle }}
        </h2>
        <h1 class="text-4xl md:text-7xl font-extrabold mb-6">{{ props.title }}</h1>
        <button
          @click="$router.push('/rooms')"
          v-if="props.buttonText"
          class="border border-white px-6 py-2 hover:bg-white hover:text-black transition cursor-pointer"
        >
          {{ props.buttonText }}
        </button>
      </div>
    </div>
  </section>
</template>
