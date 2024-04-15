<script setup lang="ts">

const list = [
  {
    name: 'bento-item-placeholder',
    required: 'false',
    description: '拖拽的时候的占位要素'
  },
  {
    name: 'empty',
    required: 'false',
    description: '数组对象要是为空显示的 DOM'
  },
]
</script>

<template>
  <br>
  <br>
  <h2>Slot</h2>
  <h3>{{ '\<Bento \/>'}} </h3>
  <Table>
    <TableCaption />
    <TableHeader>
      <TableRow>
        <TableHead>
          Name
        </TableHead>
        <TableHead>Required</TableHead>
        <TableHead class="text-right">
          Description
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in list" :key="item.props">
        <TableCell class="font-medium">
          {{ item.name }}
        </TableCell>
        <TableHead>
          {{ item.required }}
        </TableHead>

        <TableCell class="text-right">
          {{ item.description }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<style scoped>

</style>
