<script setup lang="ts">
// 1.总共有两列，每一列里面有两列
// 2.每列有四个格子，间距为 10
// 3.组件能占分别是 1,2 两种
// 4.这里先假设每个单元格的尺寸为 100*100
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'

import { initGridContainer } from './index.module'
import type { BentoCellsType } from './index.module'
import { cfg } from './config'
import { generateUuid } from './uuid'

const props = defineProps({
  bentoCells: {
    default: cfg as BentoCellsType[],
  },
  maximumCells: {
    default: 4,
  },
  size: {
    default: 100,
  },
  gap: {
    default: 10,
  },
})

const emit = defineEmits(['dragStart', 'dragEnd'])
const bentoContainerWidth = ref(`${props.maximumCells * props.size + (props.maximumCells - 1) * props.gap}px`)
const bentoContainerClassName = ref(`bento-container-${generateUuid()}`)
const bentoCells = ref(props.bentoCells)
const bentoContainerRef = ref()
const currentClickedElement: Ref<any> = ref()
const proxyBox = ref<BentoCellsType>({
  id: 'proxy',
  index: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
})
// 1.初始化盒子，给盒子添加鼠标点击事件
onMounted(() => {
  initGridContainer(bentoContainerRef, bentoCells, currentClickedElement, proxyBox, props.size, props, emit)
})
</script>

<template>
  <div
    ref="bentoContainerRef"
    :class="bentoContainerClassName"
  >
    <component
      :is="item.component"
      v-for="item, index in bentoCells"
      :id="`${item.id}`"
      :key="item.id"
      v-model="bentoCells[index]"
      style="border-radius: 9px;"
      :class="item !== currentClickedElement ? 'bento-item ' : 'z-9'"
      :style="{
        position: 'absolute',
        left: `${item.x * (props.size + props.gap)}px`,
        top: `${item.y * (props.size + props.gap)}px`,
        width: `${item.width === 2 ? item.width * props.size + props.gap : item.width * props.size}px`,
        height: `${item.height === 2 ? item.height * props.size + props.gap : item.height * props.size}px`,
      }"
    />
    <div
      v-show="currentClickedElement"
      class="bento-item-placeholder"
      :style="{
        position: 'absolute',
        left: `${proxyBox.x * (props.size + props.gap)}px`,
        top: `${proxyBox.y * (props.size + props.gap)}px`,
        width: `${proxyBox.width === 2 ? proxyBox.width * props.size + props.gap : proxyBox.width * props.size}px`,
        height: `${proxyBox.height === 2 ? proxyBox.height * props.size + props.gap : proxyBox.height * props.size}px`,
      }"
    />
  </div>
</template>

<style scoped>
.z-9{
  z-index: 9;
}
.bento-container{
  touch-action:none;
  height: 500px;
  width: v-bind(bentoContainerWidth);
  position: relative;
}
.bento-item {
  transition: all 500ms ease 0s;
  will-change: transform;
  box-shadow: 0px 0px 16px -1px rgba(0, 0, 0, 0.05), 0px 0px 16px -8px rgba(0, 0, 0, 0.05), 0px 0px 16px -12px rgba(0, 0, 0, 0.12), 0px 0px 2px 0px rgba(0, 0, 0, 0.08);
  border: 1px solid #ffffff;
  overflow: hidden;
  border-radius: 9px;
}
.bento-item-placeholder{
  transition: all 500ms ease 0s;
  will-change: transform;
  background-color: #e3e3e3;
  box-shadow: 0px 0px 16px -1px rgba(0, 0, 0, 0.05), 0px 0px 16px -8px rgba(0, 0, 0, 0.05), 0px 0px 16px -12px rgba(0, 0, 0, 0.12), 0px 0px 2px 0px rgba(0, 0, 0, 0.08);
  border: 1px solid #e3e3e3;
  overflow: hidden;
  border-radius: 9px;
}
</style>
