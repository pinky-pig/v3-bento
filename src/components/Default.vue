<script setup lang="ts">
import { Bento, BentoItem } from '../../packages/component'

import One from './default-layout/Cell1.vue'
import Two from './default-layout/Cell2.vue'
import Three from './default-layout/Cell3.vue'
import Four from './default-layout/Cell4.vue'
import Five from './default-layout/Cell5.vue'
import Six from './default-layout/Cell6.vue'

const bentoCells = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, component: markRaw(One)},
  { id: '2', x: 2, y: 0, width: 2, height: 1, component: markRaw(Two)},
  { id: '3', x: 2, y: 1, width: 1, height: 1, component: markRaw(Three)},
  { id: '4', x: 3, y: 1, width: 1, height: 2, component: markRaw(Four)},
  { id: '5', x: 0, y: 2, width: 2, height: 1, component: markRaw(Five)},
  { id: '6', x: 0, y: 2, width: 1, height: 1, component: markRaw(Six)},
]

</script>

<template>
    <Bento
      :bentoCells="bentoCells"
      class="bento-container"
      :size="140"
      :disabled="false"
      :gap="10"
      :maximum-cells="4"
    >
     
      <template #bento-item-placeholder>
        <div class="w-full h-full bg-current opacity-10 rounded-3xl"></div>
      </template>
      <template #empty>
        空白
      </template>
    </Bento>
</template>

<style scoped>


</style>

