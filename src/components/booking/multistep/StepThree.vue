<template>
  <main
    class="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid gap-6 md:grid-cols-[72px_1fr] items-center"
    role="main"
    aria-labelledby="thank-title"
  >
    <!-- Icon -->
    <div
      class="w-18 h-18 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#cca772]/20 to-[#a07a47]/10"
      aria-hidden="true"
    >
      <svg class="w-11 h-11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="url(#g)" />
        <path
          d="M7.5 12.5l2.5 2.5 6-6"
          stroke="#fff"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#cca772" />
            <stop offset="100%" stop-color="#a07a47" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Message -->
    <div>
      <h1 id="thank-title" class="text-xl font-semibold mb-2">
        Thanks — we received your reservation inquiry
      </h1>
      <p class="text-gray-600">
        Hi there — thank you for contacting <strong>LaYao Beach Resort</strong> about your
        reservation inquiry. We've received your request and our team will get back to you shortly.
      </p>

      <p class="text-gray-600 mt-4">
        An acknowledgement has been sent to your email address. Please check your inbox (and your
        spam/junk folder) for a message from
        <span class="text-[#cca772] font-medium">reservations@layao.example</span>
        containing the details of your inquiry.
      </p>

      <!-- Actions -->
      <div class="flex flex-wrap gap-3 mt-6">
        <RouterLink
          to="/"
          class="px-4 py-2 rounded-lg font-semibold text-white bg-[#cca772] hover:bg-[#b48c5c] transition"
        >
          Back to Home
        </RouterLink>
        <span
          class="px-4 py-2 rounded-lg font-semibold text-gray-400 border border-gray-200 bg-transparent cursor-not-allowed"
          aria-disabled="true"
          role="note"
        >
          You can view the reservation in your email.
        </span>
        <div class="text-sm text-gray-500 self-center">
          Need help? Call us at <strong>+63 912 345 6789</strong>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// Static component, no script needed
</script>
