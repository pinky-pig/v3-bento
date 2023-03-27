<script setup lang="ts">
import { ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import V3bento from '../../packages/v3-bento/src'
import { cfg } from './bento-components'
// import V3bento from '../../packages/v3-bento/dist/v3-bento.es.js'
const print = (val: string, e: any) => {
  // eslint-disable-next-line no-console
  console.log(val, e)
}

const maximumCells = ref(4)
const size = ref(100)
const gap = ref(10)

const containerRef = ref(null)
useResizeObserver(containerRef, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  maximumCells.value = Math.ceil(width / (size.value + gap.value))
})
</script>

<template>
  <div ref="containerRef" class="container">
    <V3bento
      class="bento-container"
      :bento-cells="cfg"
      :size="size"
      :gap="gap"
      :maximum-cells="maximumCells"
      @drag-start="print('drag-start', $event)"
      @drag-end="print('drag-end', $event)"
    />
  </div>
</template>

<style scoped>
.container {
  height: 60vh;
  width: 80vw;
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  place-items: center;
}

.bento-container {
  border: 1px solid rgb(176, 108, 108);
  margin-left: auto;
  margin-right: auto;
}
</style>
