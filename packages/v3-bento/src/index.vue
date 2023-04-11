<script setup lang="ts">
// 1.总共有两列，每一列里面有两列
// 2.每列有四个格子，间距为 10
// 3.组件能占分别是 1,2 两种
// 4.这里先假设每个单元格的尺寸为 100*100
import type { Ref } from 'vue'
import { computed, onMounted, ref, watch } from 'vue'

import { initGridContainer, isNeedDefaultLayout } from './index.module'
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
  disabled: {
    default: false,
  },
})

const emit = defineEmits(['dragStart', 'dragEnd'])
const bentoContainerWidth = computed(() => `${props.maximumCells * props.size + (props.maximumCells - 1) * props.gap}px`)
const bentoContainerHeight = ref('500px')
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
// 1. 初始化盒子，给盒子添加鼠标点击事件
onMounted(() => {
  initGridContainer(bentoContainerRef, bentoCells, currentClickedElement, proxyBox, props.size, props, emit)
})

// 2. 监听 bentoCells 的变化，重新计算 bentoContainerHeight
watch(bentoCells, (n) => {
  const h = n.reduce((prev, current) => {
    return (prev?.y + prev?.height > current?.y + current?.height) ? prev : current
  })
  if (!h)
    return
  bentoContainerHeight.value = `${(h.y + h.height) * props.size + (h.y + h.height - 1) * props.gap}px`
}, { deep: true, immediate: true })

// 3. 初始化设置格子的位置
isNeedDefaultLayout(bentoCells, props)
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
  /* touch-action 是为了解决 pointer 事件三次之后不生效的问题。其实这个监听改成 mouse 和 touch 就行了，后面优化 */
  /* https://segmentfault.com/a/1190000040746305 */
  touch-action: auto;
  height: v-bind(bentoContainerHeight);
  width: v-bind(bentoContainerWidth);
  transition: all 500ms ease 0s;
  position: relative;
  will-change: transform;
}
.bento-item ,
.bento-item-placeholder{
  transition: all 500ms ease 0s;
  box-shadow: 0px 0px 16px -1px rgba(0, 0, 0, 0.05), 0px 0px 16px -8px rgba(0, 0, 0, 0.05), 0px 0px 16px -12px rgba(0, 0, 0, 0.12), 0px 0px 2px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.bento-item-placeholder{
  background-color: #e3e3e3e0;
}
</style>
