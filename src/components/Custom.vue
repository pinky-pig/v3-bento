<script setup lang="ts">
import Bento from '../../packages/component'

const bentoCells = ref([])
</script>

<template>
  <Bento :bentoCells="bentoCells" class="bento-container">
    <template #empty>
      <Image class="mx-auto w-[200px] h-[200px]" url="/2x2.svg"></Image>
    </template>
  </Bento>
</template>

<style scoped>
.bento-container {
  border: 1px solid rgb(176, 108, 108);
  margin-left: auto;
  margin-right: auto;
}
</style>

