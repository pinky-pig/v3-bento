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
      width: `${props.width * size + gap * (props.width - 1)}px`,
      height: `${props.height * size + gap * (props.height - 1)}px`,
      userSelect: 'none',
    }"
  >
    <slot />
  </div>
</template>

<style>
.z-9 {
  z-index: 9 !important;
}

.bento-item:hover {
  cursor: grab;
}

.bento-item {
  transition: all 500ms ease 0s;
  overflow: hidden;
  z-index: 1 !important;
}
</style>
