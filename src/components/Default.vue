<script setup lang="ts">
import { Bento, BentoItem } from '../../packages/component'

import Red from './Red.vue'
import Orange from './Orange.vue'
import Gray from './Gray.vue'

const bentoCells = [
  { id: '1', x: 0, y: 0, width: 1, height: 1,},
  { id: '2', x: 2, y: 0, width: 2, height: 2,},
  { id: '3', x: 2, y: 0, width: 1, height: 1,},
]

// const bentoCells = [
//   { id: '1', x: 0, y: 0, width: 1, height: 1, component: markRaw(Red) },
//   { id: '2', x: 2, y: 0, width: 2, height: 2, component: markRaw(Orange) },
// ]
</script>

<template>

  <div ref="containerRef" class="container">
    <Bento
      :bentoCells="bentoCells"
      class="bento-container"
      :size="180"
      :disabled="false"
      :gap="10"
      :maximum-cells="4"
    >
      <BentoItem 
        v-for="item in bentoCells"
        :key="item.id"
        :id="item.id"
        :x="item.x"
        :y="item.y"
        :width="item.width"
        :height="item.height"
        class="rounded-[10px]"
      >
        <Red v-if="item.id === '1'"></Red>
        <Orange v-if="item.id === '2'"></Orange>
        <Gray v-if="item.id === '3'"></Gray>
      </BentoItem>


      <template #bento-item-placeholder>
        <div class="w-full h-full bg-yellow-200"></div>
      </template>
      <template #empty>
        空白
      </template>
    </Bento>
  </div>
</template>

<style scoped>
.container{
  border: 1px solid #b06c6c;
  height: 600px;
}
.bento-container{
  border: 1px solid #3c2ea9;
  width: 100%;
  height: 600px;
}
.bento-item-placeholder{
  background-color: #e3e3e3e0;
}
</style>

