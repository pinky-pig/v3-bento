<script setup lang="ts">
import { Bento, BentoItem } from '../../../../../packages'
import Cell from '@/components/image-card/Cell.vue'

const bentoCells = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, index: 0 },
  { id: '2', x: 0, y: 0, width: 2, height: 1, index: 1 },
  { id: '3', x: 0, y: 0, width: 1, height: 1, index: 2 },
  { id: '4', x: 0, y: 0, width: 1, height: 2, index: 3 },
  { id: '5', x: 0, y: 0, width: 2, height: 1, index: 4 },
  { id: '6', x: 0, y: 0, width: 1, height: 1, index: 5 },
]

const isMobileRef = ref(/iPhone|iPod|Android|Mobile/i.test(navigator.userAgent))
const disabled = ref(isMobileRef.value)
const size = ref(140)
const gap = ref(10)
const maximumCells = ref(4)

if (document.body.clientWidth <= 768) {
  // 如果是宽度比较小
  maximumCells.value = 2
  size.value = (document.body.clientWidth - 50) / 2 - 28
}
else {
  maximumCells.value = 4
}
</script>

<template>
  <Bento
    :bento-cells="bentoCells"
    class="!max-h-[610px] overflow-y-auto overflow-x-hidden p-[10px] box-content"
    :size="size"
    :disabled="disabled"
    :gap="gap"
    :maximum-cells="maximumCells"
    @drag-end="(e: any) => console.log(e)"
    @drag-start="(e: any) => console.log(e)"
  >
    <BentoItem
      v-for="item in bentoCells"
      :id="item.id"
      :key="item.id"
      :x="item.x"
      :y="item.y"
      :width="item.width"
      :height="item.height"
    >
      <Cell :url="`./${item.id}.svg`" bg="#fff" />
    </BentoItem>

    <template #bento-item-placeholder>
      <div class="w-full h-full bg-current opacity-10 rounded-3xl" />
    </template>
  </Bento>
</template>
