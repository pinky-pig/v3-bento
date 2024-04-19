<script setup lang="ts">
// 1.总共有两列，每一列里面有两列
// 2.每列有四个格子，间距为 10
// 3.组件能占分别是 1,2 两种
// 4.这里先假设每个单元格的尺寸为 100*100
import type { Ref } from 'vue'
import { computed, onMounted, provide, ref, useSlots, watch } from 'vue'

import { initGridContainer, isNeedDefaultLayout } from './core'
import type { BentoItemType, BentoProps } from './types'

const props = withDefaults(
  defineProps<BentoProps>(),
  {
    maximumCells: 4,
    size: 100,
    gap: 10,
    disabled: false,
    commonClass: 'bento-item',
    rotateType: 'light',
  },
)

const emit = defineEmits(['dragStart', 'dragEnd'])
const isDragging = ref(false)
const bentoContainerWidth = computed(() => `${props.maximumCells! * props.size! + (props.maximumCells! - 1) * props.gap!}px`)

const bentoItemRotateCfg = {
  light: {
    maxVelocity: 10, // 最大速度
    maxRotation: 45, // 最大旋转角度
    rotationFactor: 0.8, // 旋转系数，用于调整旋转幅度
  },
  medium: {
    maxVelocity: 10, // 最大速度
    maxRotation: 60, // 最大旋转角度
    rotationFactor: 2, // 旋转系数，用于调整旋转幅度
  },
  heavy: {
    maxVelocity: 5, // 最大速度
    maxRotation: 75, // 最大旋转角度
    rotationFactor: 0.8, // 旋转系数，用于调整旋转幅度
  },
  none: {
    maxVelocity: 0,
    maxRotation: 0,
    rotationFactor: 0,
  },
}
const bentoContainerHeight = ref('500px')

const bentoCells = ref<BentoItemType[]>(props.bentoCells)
const bentoContainerRef = ref()
const currentClickedElement: Ref<any> = ref()
const proxyBox = ref<BentoItemType>({
  id: 'proxy',
  index: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
})

// 0. 初始化设置格子的位置
if (bentoCells.value?.length)
  isNeedDefaultLayout(bentoCells, props)

// 1. 初始化盒子，给盒子添加鼠标点击事件
onMounted(() => {
  initGridContainer(bentoContainerRef, bentoCells, currentClickedElement, proxyBox, props.size!, props, emit, isDragging, bentoItemRotateCfg[props.rotateType])
})

// 2. 监听 bentoCells 的变化，重新计算 bentoContainerHeight
watch(bentoCells, (n) => {
  if (n?.length) {
    const h = n.reduce((prev, current) => {
      return (prev?.y + prev?.height > current?.y + current?.height) ? prev : current
    })
    if (!h)
      return
    bentoContainerHeight.value = `${(h.y + h.height) * props.size! + (h.y + h.height - 1) * props.gap!}px`
  }
}, { deep: true, immediate: true })

// 3. 另加的提供给 BentoItem ，如果只是动态 component 的话，都不需要这个。
provide('size', computed(() => props.size))
provide('gap', computed(() => props.gap))
provide('commonClass', computed(() => props.commonClass))
provide('isDragging', isDragging)
provide('currentClickedElement', currentClickedElement)

// 4. 判断是 BentoItem 还是 动态 component
const slotDefault = !!useSlots().default
const showBentoFromDataOrSlot = computed(() => {
  const hasComponentInData = bentoCells.value.every(item => item.component)
  if (hasComponentInData)
    return 'data'
  if (slotDefault)
    return 'slot'

  return 'slot'
})

// 松开后的过渡过去的时候的层级置顶，延迟的时间是写死的，后面可以配置
const bentoItemZIndex = ref('')
watch(currentClickedElement, (newVal, _oldVal) => {
  if (newVal?.id) {
    bentoItemZIndex.value = 'z-9'
  }
  else {
    setTimeout(() => {
      bentoItemZIndex.value = ''
    }, 500)
  }
}, { deep: true })
</script>

<template>
  <div
    v-if="bentoCells?.length"
    ref="bentoContainerRef"
    :style="{
      /* touch-action 是为了解决 pointer 事件三次之后不生效的问题。其实这个监听改成 mouse 和 touch 就行了，后面优化 */
      /* https://segmentfault.com/a/1190000040746305 */
      touchAction: 'auto',
      height: bentoContainerHeight,
      width: bentoContainerWidth,
      transition: 'all 500ms ease 0s',
      position: 'relative',
      willChange: 'transform',
      marginLeft: 'auto',
      marginRight: 'auto',
    }"
  >
    <div v-if="showBentoFromDataOrSlot === 'data'">
      <div
        v-for="item, index in bentoCells"
        :id="`${`${commonClass}-${item.id}`}`"
        :key="item.id"
        :class="`${item.id !== currentClickedElement?.id ? commonClass : ''} ${bentoItemZIndex}` "
        :style="{
          position: 'absolute',
          transform: `
            translate3d(
              ${item.x * (props.size + props.gap)}px,
              ${item.y * (props.size + props.gap)}px,
            0)`,
          width: `${item.width * props.size + props.gap * (item.width - 1)}px`,
          height: `${item.height * props.size + props.gap * (item.height - 1)}px`,
        }"
      >
        <component
          :is="item.component"
          v-model="bentoCells[index]"
          :style="{
            willChange: 'transform',
            transition: 'transform .2s ease-out',
            overflow: 'none',
            transform:
              item.id === currentClickedElement?.id
                ? ` rotate(${currentClickedElement?.rotate || 0}deg) `
                : ` rotate(0)`,
            width: `100%`,
            height: `100%`,
            userSelect: 'none',
          }"
        />
      </div>
    </div>

    <div v-if="showBentoFromDataOrSlot === 'slot'">
      <slot />
    </div>

    <div
      v-show="currentClickedElement"
      class="bento-item-placeholder"
      :style="{
        willChange: 'transform',
        position: 'absolute',
        transform: `
          translate3d(
            ${proxyBox.x * (props.size + props.gap)}px,
            ${proxyBox.y * (props.size + props.gap)}px,
          0)`,

        width: `${proxyBox.width * props.size + props.gap * (proxyBox.width - 1)}px`,
        height: `${proxyBox.height * props.size + props.gap * (proxyBox.height - 1)}px`,
      }"
    >
      <slot name="bento-item-placeholder" />
    </div>
  </div>
  <div v-else>
    <slot name="empty" />
  </div>
</template>

<style>
.bento-item-placeholder {
  transition: all 500ms ease 0s;
  overflow: hidden;
  z-index: 2;
}
</style>
