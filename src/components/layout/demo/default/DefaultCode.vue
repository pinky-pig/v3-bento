<script setup lang="ts">
import { toast } from 'vue-sonner'

const code = `
<script setup lang="ts">
import { Bento, BentoItem } from 'v3-bento'
import Cell from '@/components/image-card/Cell.vue'

const bentoCells = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, index: 0, },
  { id: '2', x: 2, y: 0, width: 2, height: 1, index: 1, },
  { id: '3', x: 2, y: 1, width: 1, height: 1, index: 2, },
  { id: '4', x: 3, y: 1, width: 1, height: 2, index: 3, },
  { id: '5', x: 0, y: 2, width: 2, height: 1, index: 4, },
  { id: '6', x: 0, y: 2, width: 1, height: 1, index: 5, },
]
<\/script>

<template>
  <Bento
    :bentoCells="bentoCells"
    class="bento-container"
    :size="140"
    :disabled="false"
    :gap="10"
    :maximum-cells="4"
    @drag-end="(e: any) => console.log(e)"
  >
    <BentoItem 
      v-for="item in bentoCells" 
      :key="item.id" 
      :id="item.id" 
      :x="item.x" 
      :y="item.y" 
      :width="item.width" 
      :height="item.height"
    >
      {{ item.id }}
    <\/BentoItem>
    <!-- Optional -->
    <template #bento-item-placeholder>
      <div class="w-full h-full bg-current opacity-10 rounded-3xl"><\/div>
    <\/template>
  <\/Bento>
<\/template>
`
const showCheckIcon = ref(false)

async function handleCopyCode() {
  await useCopyCode({ code, checkIconRef: showCheckIcon })
  toast('Copied to your clipboard!!!')
}
</script>

<template>
  <div class="relative h-[610px] overflow-auto">
    <Suspense>
      <Code :code="code" lang="bash" />
    </Suspense>

    <button
      aria-label="Copy code"
      title="Copy code"
      class="absolute btn-border w-[26px] h-[26px] rounded-[5px] p-1 top-1 right-2 flex justify-center items-center border border-solid border-[#f3f3f3] dark:border-[#1e293b]"
      @click="handleCopyCode"
    >
      <div v-if="showCheckIcon" class="i-lucide-check text-[14px]" />
      <div v-else class="i-lucide-copy text-[14px]" />
    </button>
  </div>
</template>
