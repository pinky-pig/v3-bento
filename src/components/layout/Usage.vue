<script setup lang="ts">
import { toast } from 'vue-sonner'

// -------------------方式 1 ----------------------- //
const codeInBentoItem = `
<script setup lang="ts">
import { Bento } from 'v3-bento'

const bentoCells = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, component: markRaw(One)},
  { id: '2', x: 2, y: 0, width: 2, height: 1, component: markRaw(Two)},
  { id: '3', x: 2, y: 1, width: 1, height: 1, component: markRaw(Three)},
  { id: '4', x: 3, y: 1, width: 1, height: 2, component: markRaw(Four)},
  { id: '5', x: 0, y: 2, width: 2, height: 1, component: markRaw(Five)},
  { id: '6', x: 0, y: 2, width: 1, height: 1, component: markRaw(Six)},
]
<\/script>

<template>
  <Bento
    :bentoCells="bentoCells"
    :size="140"
    :gap="10"
    :maximum-cells="4"
  \/>
<\/template>
`
const showCheckIconBentoItem = ref(false)

async function handleCopyCodeBentoItem() {
  await useCopyCode({ code: codeInBentoItem, checkIconRef: showCheckIconBentoItem })
  toast('Copied to your clipboard!!!')
}

// -------------------方式 2 ----------------------- //
const codeInMarkRaw = `
<script setup lang="ts">
import { Bento } from 'v3-bento'

const bentoCells = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, component: markRaw(One)},
  { id: '2', x: 2, y: 0, width: 2, height: 1, component: markRaw(Two)},
  { id: '3', x: 2, y: 1, width: 1, height: 1, component: markRaw(Three)},
  { id: '4', x: 3, y: 1, width: 1, height: 2, component: markRaw(Four)},
  { id: '5', x: 0, y: 2, width: 2, height: 1, component: markRaw(Five)},
  { id: '6', x: 0, y: 2, width: 1, height: 1, component: markRaw(Six)},
]
<\/script>

<template>
  <Bento
    :bentoCells="bentoCells"
    :size="140"
    :gap="10"
    :maximum-cells="4"
  \/>
<\/template>
`
const showCheckIconMarkRaw = ref(false)

async function handleCopyCodeMarkRaw() {
  await useCopyCode({ code: codeInMarkRaw, checkIconRef: showCheckIconMarkRaw })
  toast('Copied to your clipboard!!!')
}
</script>

<template>
  <h2>Usage</h2>
  <h3>方式一： 通过 BentoItem 组件使用。 </h3>
  <div class="relative">
    <Suspense>
      <Code :code="codeInMarkRaw" lang="vue" />
    </Suspense>

    <button
      aria-label="Copy code"
      title="Copy code"
      class="absolute btn-border w-[26px] h-[26px] rounded-[5px] p-1 top-1 right-2 flex justify-center items-center border border-solid border-[#f3f3f3] dark:border-[#1e293b]"
      @click="handleCopyCodeBentoItem"
    >
      <div v-if="showCheckIconMarkRaw" class="i-lucide-check text-[14px]" />
      <div v-else class="i-lucide-copy text-[14px]" />
    </button>
  </div>

  <h3>方式二： 通过 markRaw()使用 </h3>
  <div class="relative">
    <Suspense>
      <Code :code="codeInMarkRaw" lang="vue" />
    </Suspense>

    <button
      aria-label="Copy code"
      title="Copy code"
      class="absolute btn-border w-[26px] h-[26px] rounded-[5px] p-1 top-1 right-2 flex justify-center items-center border border-solid border-[#f3f3f3] dark:border-[#1e293b]"
      @click="handleCopyCodeMarkRaw"
    >
      <div v-if="showCheckIconMarkRaw" class="i-lucide-check text-[14px]" />
      <div v-else class="i-lucide-copy text-[14px]" />
    </button>
  </div>
</template>
