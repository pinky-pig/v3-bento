<script setup lang="ts">
defineProps<{
  url: string;
  bg: string;
}>();

</script>

<template>
  <div 
    class="animated rounded-xl w-full h-full p-3 border-2 solid border-current dark:border-current " 
    :class="`bg-[${bg}]`"
  >
    <img class="w-full h-full object-cover" :src="url" alt="">
  </div>
</template>

<style scoped>

</style>
