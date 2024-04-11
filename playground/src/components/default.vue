<script setup lang="ts">
import Bento from '../../../packages/component'
</script>

<template>
  <Bento class="bento-container" >
    <template #empty>
      no components
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

