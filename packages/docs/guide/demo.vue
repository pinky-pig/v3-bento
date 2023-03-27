<script setup lang="ts">
import { markRaw, ref } from 'vue'
import V3Dragblock from '../../v3-dragblock/src'
import GridCellOne from '../components/GridCellOne.vue'
import GridCellTwo from '../components/GridCellTwo.vue'
import GridCellThree from '../components/GridCellThree.vue'
import GridCellFour from '../components/GridCellFour.vue'

const gridCells = ref([
  { id: '0', index: 0, x: 20, y: 35, width: 190, height: 110, component: markRaw(GridCellOne) }, // 辫子
  { id: '1', index: 0, x: 465, y: 25, width: 170, height: 160, component: markRaw(GridCellTwo) }, // 摆手
  { id: '2', index: 0, x: 385, y: 265, width: 200, height: 50, component: markRaw(GridCellThree) }, // text
  { id: '3', index: 0, x: 150, y: 195, width: 130, height: 130, component: markRaw(GridCellFour) }, // 白边
])

const adsorbLineStyle = {
  stroke: 'black',
  fill: 'black',
  strokeWidth: 2,
}

const print = (val: string, e: any) => {
  // console.log(val, e)
}
</script>

<template>
  <div class="drag-canvas">
    <V3Dragblock
      class="V3Dragblock"
      :grid-cells="gridCells"
      :draggable="true"
      :resizable="true"
      :adsorbable="true"
      :adsorb-line-style="adsorbLineStyle"
      @dragging="print('dragging', $event)"
      @drag-start="print('drag-start', $event)"
      @drag-end="print('drag-end', $event)"
      @resizing="print('resizing', $event)"
      @resize-start="print('resize-start', $event)"
      @resize-end="print('resize-end', $event)"
    />
  </div>
</template>

<style scoped>
.drag-canvas {
  width: 100%;
  height: 40vh;
  font-size: 17px;
  font-weight: bold;
  border: 10px solid #474747;
  border-radius: 0.75em;
  display: inline-flex;
}

.V3Dragblock{
  background: #f7f4f0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-width: 1px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}
</style>
