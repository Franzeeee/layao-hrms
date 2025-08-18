<script setup lang="ts">
import HeroBannerBreadcrumbs from '@/components/layout/HeroBannerBreadcrumbs.vue'
import FeatureSection from '@/components/layout/FeatureSection.vue'
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const sendMessage = () => {
  // For now, just log (you can connect to backend later)
  console.log('Message sent:', { name: name.value, email: email.value, message: message.value })
  alert('Your message has been sent!')
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <HeroBannerBreadcrumbs
    title="Contact Us"
    :breadcrumbs="[{ text: 'Home', link: '/' }, { text: 'Contact Us' }]"
    backgroundImage="/images/hero-img.jpg"
  />

  <FeatureSection
    title="Get in Touch"
    description="We’d love to hear from you! Reach out to us for inquiries, bookings, or assistance."
    :cols="1"
  >
    <!-- Google Maps -->
    <div class="w-full h-96 rounded-xl overflow-hidden shadow-lg mb-8">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d72340.31679264385!2d125.12195088727496!3d11.237514143545079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33087de4bcdf1f8f%3A0x31aa804f2920ad31!2sLaYao%20Beach%20Resort!5e0!3m2!1sen!2sph!4v1755002752180!5m2!1sen!2sph"
        width="100%"
        height="700"
        style="border: 0"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    <!-- Contact Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Info -->
      <div class="bg-white rounded-xl shadow p-6">
        <h3 class="text-lg font-semibold mb-4">📍 Address</h3>
        <p class="text-gray-600 mb-4">LaYao Beach Resort, Brgy.San Roque Marabut, Samar</p>
        <h3 class="text-lg font-semibold mb-2">📞 Call Us</h3>
        <p class="text-gray-600 mb-4">+63 917 133 0373</p>
        <h3 class="text-lg font-semibold mb-2">✉️ Email</h3>
        <p class="text-gray-600">layaobeachresort@gmail.com</p>
      </div>

      <!-- Inputs -->
      <div class="bg-white rounded-xl shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Your Details</h3>
        <input
          v-model="name"
          type="text"
          placeholder="Your Name"
          class="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-200"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Your Email"
          class="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-200"
        />
      </div>

      <!-- Message -->
      <div class="bg-white rounded-xl shadow p-6 flex flex-col">
        <h3 class="text-lg font-semibold mb-4">Your Message</h3>
        <textarea
          v-model="message"
          rows="6"
          placeholder="Write your message..."
          class="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-200 resize-none"
        ></textarea>
        <button
          @click="sendMessage"
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow mt-auto"
        >
          Send Message
        </button>
      </div>
    </div>
  </FeatureSection>
</template>
