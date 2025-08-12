<script setup lang="ts">
import Logo from '../Logo.vue'
</script>

<template>
  <footer class="bg-white text-gray-900 py-10 pb-4 pt-10">
    <div class="max-w-6xl mx-auto px-4 grid gap-8 items-start pb-8 grid-cols-1 md:grid-cols-5">
      <!-- Logo / Brand -->
      <div class="md:col-span-3">
        <Logo />
        <p class="text-sm text-gray-400 leading-relaxed text-left mt-2">
          LaYao Beach Resort is a charming beachfront destination nestled in the tranquil coastal
          town of Marabut, Samar. Famous for its iconic dog-bone–shaped infinity pool and inviting
          modern suites, the resort offers the perfect escape where breathtaking rock formations,
          sun-kissed shores, and gentle sea breezes meet. Whether you’re unwinding by the pool,
          savoring fresh local cuisine at Lyne’s Kitchen, exploring secluded coves by kayak, or
          simply soaking in the serene views of the bay, LaYao Beach Resort promises a memorable
          stay where comfort meets nature’s raw beauty.
        </p>
      </div>

      <!-- Quick Links -->
      <div class="md:col-span-1 mt-8 md:mt-0">
        <h3 class="text-black text-2xl font-semibold mb-2">Quick Links</h3>
        <ul class="space-y-1 mt-4">
          <li><a href="#" class="hover:text-[#c4a164] transition">Home</a></li>
          <li><a href="#" class="hover:text-[#c4a164] transition">Rooms</a></li>
          <li><a href="#" class="hover:text-[#c4a164] transition">Services</a></li>
          <li><a href="#" class="hover:text-[#c4a164] transition">Contact</a></li>
        </ul>
      </div>

      <!-- Social Media -->
      <div class="md:col-span-1 mt-8 md:mt-0">
        <h3 class="text-black font-semibold mb-2 text-2xl">Follow Us</h3>
        <div class="flex space-x-3 mt-4">
          <a href="#" class="hover:text-[#c4a164] transition text-xl">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="hover:text-[#c4a164] transition text-xl">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="hover:text-[#c4a164] transition text-xl">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="mt-8 text-center text-sm text-gray-500 border-t border-gray-200 pt-4">
      © 2025 Layao Resort. All rights reserved.
    </div>
  </footer>
</template>
