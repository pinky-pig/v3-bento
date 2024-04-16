<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import type { Ref } from 'vue'

const props = withDefaults(
  defineProps<{
    id: string
    x: number
    y: number
    width?: number
    height?: number
  }>(),
  {
    width: 1,
    height: 1,
  },
)
const size = inject('size') as Ref<number>
const gap = inject('gap') as Ref<number>
const commonClass = inject('commonClass') as Ref<number>
const currentClickedElement = inject('currentClickedElement') as Ref<any>

// 松开后的过渡过去的时候的层级置顶，延迟的时间是写死的，后面可以配置
const bentoItemZIndex = ref('')
watch(currentClickedElement, (_newVal, _oldVal) => {
  if (props.id === currentClickedElement.value?.id) {
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
    :id="`${props.id}`"
    :class="`${props.id !== currentClickedElement?.id ? commonClass : ''} ${bentoItemZIndex}` "
    :style="{
      willChange: 'transform',
      overflow: 'hidden',
      position: 'absolute',
      transform:
        props.id === currentClickedElement?.id
          ? `translate3d(
            ${currentClickedElement.x * (size + gap)}px,
            ${currentClickedElement.y * (size + gap)}px,
          0)`
          : `translate3d(
            ${props.x * (size + gap)}px,
            ${props.y * (size + gap)}px,
          0)`,
      width: `${props.width === 2 ? props.width * size + gap : props.width * size}px`,
      height: `${props.height === 2 ? props.height * size + gap : props.height * size}px`,
      userSelect: 'none',
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.z-9 {
  z-index: 9;
}

.bento-item:hover {
  cursor: grab;
}

.bento-item {
  transition: all 500ms ease 0s;
  box-shadow:
    0px 0px 16px -1px rgba(0, 0, 0, 0.05),
    0px 0px 16px -8px rgba(0, 0, 0, 0.05),
    0px 0px 16px -12px rgba(0, 0, 0, 0.12),
    0px 0px 2px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
</style>
