<template>
  <div class="w-full h-full flex flex-col items-center justify-center text-center px-4 pt-10">
    <div class="py-8" />

    <BentoIcon class="w-12 h-12 inline-block mb-4" />

    <h1 class="text-4xl font-bold mb-2">
      V3 Bento
    </h1>

    <p>
      <em class="text-sm opacity-75">A simple bento layout component for Vue3.</em>
    </p>

    <div class="flex flex-row justify-center items-center gap-2 mt-5">
      <Button class="h-[38px] w-[148px] font-medium gap-2" @click="toggleDark">
        <div class="i-carbon-sun dark:i-carbon-moon text-lg" />
        <span v-show="!isDark">Light</span>
        <span v-show="isDark">Dark</span>
      </Button>

      <a rel="noreferrer" href="https://github.com/pinky-pig/v3-bento" target="_blank">
        <Button variant="secondary" class="h-[38px] w-[148px] text-[13px]">
          GitHub
        </Button>
      </a>
    </div>

    <!-- <a href="/api/props" class="underline text-sm opacity-75 text-[14px] my-4 cursor-pointer ">
      Documentation
    </a> -->

    <div class="py-8" />

    <div
      class="w-full max-w-[652px] mx-auto text-start"
      style="
        padding-left: max(16px, env(safe-area-inset-left));
        padding-right: max(16px, env(safe-area-inset-right));
      "
    >
      <Installation />

      <BentoItemUsage />

      <DemoDefault />

      <Properties />

      <Events />

      <BentoSlot />
    </div>

    <TheFooter />

    <Sonner
      position="top-center"
      :expand="false"
      :rich-colors="false"
      :close-button="false"
    />
  </div>
</template>
