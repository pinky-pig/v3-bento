<script setup lang="ts" generic="T extends any, O extends any">
import { Card, CardContent,} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs'

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
      <em class="text-sm opacity-75">Arvin's Simple Vite Starter Template</em>
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

    <div class="container">

      <Default />

      <h2>Installation</h2>
      pnpm i v3-bento
      <h2>Installation</h2>
      pnpm i v3-bento


    </div>




    <TheFooter></TheFooter>
  </div>
</template>
<style scoped>
.container {
  --side-padding: 16px;
  max-width: 642px;
  margin: 0 auto;
  padding-left: max(var(--side-padding), env(safe-area-inset-left));
  padding-right: max(var(--side-padding), env(safe-area-inset-right));
  text-align: start;
}
h2{
  font-size: 16px;
  font-weight: 500;
  margin: 12px 0;
}
</style>
