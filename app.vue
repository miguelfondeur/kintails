<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.pattern-background {
  background-image: 
    radial-gradient(#00000010 3px, transparent 3px),
    radial-gradient(#00000010 3px, transparent 3px);
  background-size: 40px 40px;
  background-position: 0 0, 20px 20px;
  animation: patternFloat 30s linear infinite;
}

@keyframes patternFloat {
  0% {
    background-position: 0 0, 20px 20px;
  }
  100% {
    background-position: 40px 40px, 60px 60px;
  }
}

/* Add friendly rounded font */
body {
  font-family: 'Quicksand', ui-rounded, system-ui, sans-serif;
}

.font-rounded {
  font-family: 'Quicksand', ui-rounded, system-ui, sans-serif;
}
</style>