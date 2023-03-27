<script setup lang="ts">
import { defineComponent, h, markRaw } from 'vue'
// import V3bento from '../../packages/v3-bento/src'
import V3bento from '../../packages/v3-bento/dist/v3-bento.es.js'

const cfg = [
  { id: '1', x: 0, y: 0, width: 1, height: 1, component: markRaw(createBentoCellComponent('Bento1', '1')) },
  { id: '2', x: 1, y: 0, width: 1, height: 1, component: markRaw(createBentoCellComponent('Bento2', '2')) },
  { id: '3', x: 2, y: 0, width: 2, height: 2, component: markRaw(createBentoCellComponent('Bento3', '3')) },
  { id: '4', x: 3, y: 0, width: 2, height: 2, component: markRaw(createBentoCellComponent('Bento4', '4')) },
  { id: '5', x: 2, y: 1, width: 2, height: 1, component: markRaw(createBentoCellComponent('Bento5', '5')) },
  { id: '6', x: 2, y: 1, width: 2, height: 1, component: markRaw(createBentoCellComponent('Bento6', '6')) },
]

// 创建组件
const colors = 'cae7b9-f3de8a-eb9486-7e7f9a-97a7b3-4059ad'.split('-').map(a => `#${a}`)
function createBentoCellComponent(name: string, content: string) {
  return defineComponent({
    name,
    setup() {
      return () => h(
        'div',
        {
          style: `
            background: ${colors[Number(content) - 1]};
            display: grid;
            place-items: center;
            font-size: 48px;
            user-select: none;
          `,
        },
        content)
    },
  })
}
const print = (val: string, e: any) => {
  // eslint-disable-next-line no-console
  console.log(val, e)
}
</script>

<template>
  <div class="container">
    <V3bento
      class="bento-container"
      :bento-cells="cfg"
      :size="100"
      :gap="10"
      :maximum-cells="4"
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
.bento-container{
  border: 1px solid rgb(176, 108, 108);
  margin-left: auto;
  margin-right: auto;
}
</style>
