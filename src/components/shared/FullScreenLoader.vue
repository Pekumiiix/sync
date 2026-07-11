<style scoped>
@keyframes logoFill {
  0% {
    clip-path: inset(100% 0 0 0);
  }
  80% {
    clip-path: inset(0 0 0 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}

.animate-logo-fill {
  animation: logoFill 1.5s ease-in-out infinite;
}
</style>

<template>
  <div class="fixed inset-0 z-9999 bg-white flex flex-col items-center justify-center">
    <div class="relative size-16">
      <img
        src="/images/app/app-logo.png"
        alt="Sync Logo"
        class="absolute inset-0 size-full opacity-20 grayscale"
      />

      <img
        src="/images/app/app-logo.png"
        alt="Sync Logo"
        class="absolute inset-0 size-full animate-logo-fill"
      />
    </div>
  </div>
</template>
