<script setup lang="ts">

</script>

<template>
  <div class="animated rounded-xl w-full h-full p-3 border-2 solid border-current hover:bg-[#e788a5] dark:border-current" >
    <img class="w-full h-full " src="/2.svg" alt="">
  </div>
</template>

<style scoped>
.animated {
  animation: fade 1s ease-in-out;
}
@keyframes fade {
  0% {
    background-color: #e788a5;
  }
  100% {
    background-color: unset;
  }
}
</style>
