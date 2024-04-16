<script setup lang="ts">
const list = [
  {
    name: 'dragStart',
    return: 'cell',
    description: '拖拽开始，返回选中拖拽的那个格子对象',
  },
  {
    name: 'dragEnd',
    return: 'bentoCells',
    description: '拖拽结束，返回排序后的 bentoCells 数组',
  },
]
</script>

<template>
  <br>
  <h3>{{ '\<Bento \/>' }}</h3>
  <Table>
    <TableCaption />
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          Name
        </TableHead>
        <TableHead>Return</TableHead>
        <TableHead class="text-right">
          Description
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in list" :key="item.name">
        <TableCell class="font-medium">
          {{ item.name }}
        </TableCell>
        <TableHead>
          {{ item.return }}
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
