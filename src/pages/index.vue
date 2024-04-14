<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center text-center px-4 pt-10">

    <div class="py-8" />

    <BentoIcon class="w-12 h-12 inline-block mb-4"></BentoIcon>

    <h1 class="text-4xl font-bold mb-2">
      V3 Bento
    </h1>

    <p>
      <em class="text-sm opacity-75">A simple bento layout component for Vue3.</em>
    </p>

    <div class="flex flex-row justify-center items-center gap-2 mt-5">

      <a rel="noreferrer" href="https://github.com/pinky-pig/vue-starter-lite" target="_blank">
        <Button class="h-[38px] w-[148px] text-[13px]">
          Get started
        </Button>
      </a>
      <a rel="noreferrer" href="https://github.com/pinky-pig/vue-starter-lite" target="_blank">
        <Button variant="outline" class="h-[38px] w-[148px] text-[13px]">
          GitHub 
        </Button>
      </a>
    </div>

    <div class="py-8" />

    <div 
      class="w-full max-w-[642px] mx-auto text-start"
      style="
        padding-left: max(16px, env(safe-area-inset-left));
        padding-right: max(16px, env(safe-area-inset-right));
      "
    >

      <!-- <DemoDefault /> -->
      <!-- <DemoByMarkRaw /> -->
      <Installation></Installation>

      <BentoItemUsage></BentoItemUsage>

    </div>




    <TheFooter></TheFooter>
  </div>
</template>
