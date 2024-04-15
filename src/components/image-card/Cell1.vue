<script setup lang="ts">

</script>

<template>
  <div class="animated rounded-xl w-full h-full p-3 border-2 solid border-current hover:bg-[#c0b3e3] dark:border-current " >
    <img class="w-full h-full object-cover" src="/1.svg" alt="">
  </div>
</template>

<style scoped>
.animated {
  animation: fade 1s ease-in-out;
}
@keyframes fade {
  0% {
    background-color: #c0b3e3;
  }
  100% {
    background-color: unset;
  }
}
</style>
