<script setup lang="ts">
import { Bento } from '../../../../packages'
import type { BentoItemType } from '../../../../packages/types'

import One from '@/components/image-card/Cell1.vue'
import Two from '@/components/image-card/Cell2.vue'
import Three from '@/components/image-card/Cell3.vue'
import Four from '@/components/image-card/Cell4.vue'
import Five from '@/components/image-card/Cell5.vue'
import Six from '@/components/image-card/Cell6.vue'

const bentoCells: BentoItemType[] = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, index: 0, component: markRaw(One) },
  { id: '2', x: 2, y: 0, width: 2, height: 1, index: 1, component: markRaw(Two) },
  { id: '3', x: 2, y: 1, width: 1, height: 1, index: 2, component: markRaw(Three) },
  { id: '4', x: 3, y: 1, width: 1, height: 2, index: 3, component: markRaw(Four) },
  { id: '5', x: 0, y: 2, width: 2, height: 1, index: 4, component: markRaw(Five) },
  { id: '6', x: 0, y: 2, width: 1, height: 1, index: 5, component: markRaw(Six) },
]
</script>

<template>
  <Bento
    :bento-cells="bentoCells"
    class="bento-container"
    :size="140"
    :disabled="false"
    :gap="10"
    :maximum-cells="4"
  >
    <template #bento-item-placeholder>
      <div class="w-full h-full bg-current opacity-10 rounded-3xl" />
    </template>
  </Bento>
</template>
