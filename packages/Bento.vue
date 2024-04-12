<script setup lang="ts">
// 1.总共有两列，每一列里面有两列
// 2.每列有四个格子，间距为 10
// 3.组件能占分别是 1,2 两种
// 4.这里先假设每个单元格的尺寸为 100*100
import type { Ref} from 'vue'
import { computed, onMounted, ref, watch,provide } from 'vue'
import { useSlots } from "vue";
import { initGridContainer, isNeedDefaultLayout } from './index'
import type { BentoCellsType } from './index'

const props = withDefaults(
  defineProps<{
    // 是否显示关闭按钮
    bentoCells: BentoCellsType[]
    // 格子的大小
    size?: number
    // 每一行最大格子数量
    maximumCells?: number
    // 格子的间距
    gap?: number
    // 是否禁用拖拽
    disabled?: boolean
    // 格子类名
    commonClass?: string
  }>(),
  {
    maximumCells: 4,
    size: 100,
    gap: 10,
    disabled: false,
    commonClass: 'bento-item',
  },
)

const emit = defineEmits(['dragStart', 'dragEnd'])
const isDragging = ref(false)
const bentoContainerWidth = computed(() => `${props.maximumCells! * props.size! + (props.maximumCells! - 1) * props.gap!}px`)

const bentoContainerHeight = ref('500px')
const bentoCells = ref<BentoCellsType[]>(props.bentoCells)
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

// 0. 初始化设置格子的位置
if (bentoCells.value?.length) {
  isNeedDefaultLayout(bentoCells, props)
}

// 1. 初始化盒子，给盒子添加鼠标点击事件
onMounted(() => {
  initGridContainer(bentoContainerRef, bentoCells, currentClickedElement, proxyBox, props.size!, props, emit, isDragging)
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
provide('size', props.size)
provide('gap', props.gap)
provide('isDragging', isDragging)
provide('currentClickedElement', currentClickedElement)

// 4. 判断是 BentoItem 还是 动态 component
const slotDefault = !!useSlots().default
const showBentoFromDataOrSlot = computed(() => {
  const hasComponentInData = bentoCells.value.every((item) => item.component)
  if (hasComponentInData) 
    return 'data'
  if (slotDefault) 
    return 'slot'
})
</script>

<template>
  <div
    ref="bentoContainerRef"
    v-if="bentoCells?.length"
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
      <component
        :is="item.component"
        v-for="item, index in bentoCells"
        :id="`${item.id}`"
        :key="item.id"
        v-model="bentoCells[index]"
        :class="item !== currentClickedElement ? 'bento-item' : 'z-9'"
        :style="{
          position: 'absolute',
          transform: `
            translate3d(
              ${item.x * (props.size + props.gap)}px,
              ${item.y * (props.size + props.gap)}px,
            0)`,
          width: `${item.width === 2 ? item.width * props.size + props.gap : item.width * props.size}px`,
          height: `${item.height === 2 ? item.height * props.size + props.gap : item.height * props.size}px`,
        }"
      />
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

        width: `${proxyBox.width === 2 ? proxyBox.width * props.size + props.gap : proxyBox.width * props.size}px`,
        height: `${proxyBox.height === 2 ? proxyBox.height * props.size + props.gap : proxyBox.height * props.size}px`,
      }"
    >
      <slot name="bento-item-placeholder" />
    </div>
  </div>
  <div v-else>
    <slot name="empty" />
  </div>
</template>

<style scoped>
.z-9{
  z-index: 9;
}
.bento-item:hover{
  cursor: grab;
}
.bento-item ,
.bento-item-placeholder{
  transition: all 500ms ease 0s;
  overflow: hidden;
}
</style>
