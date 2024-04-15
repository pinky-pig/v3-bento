<script setup lang="ts">



const list = [
  {
    props: 'id',
    type: 'string',
    default: '',
    required: 'true',
    description: '格子的 ID'
  },
  {
    props: 'x',
    type: 'number',
    default: '0',
    required: 'true',
    description: '格子的 x 轴坐标'
  },
  {
    props: 'y',
    type: 'number',
    default: '0',
    required: 'true',
    description: '格子的 y 轴坐标'
  },
  {
    props: 'width',
    type: 'number',
    default: '1',
    required: 'false',
    description: '每个单元格在 X 方向上占多大的格子'
  },
  {
    props: 'height',
    type: 'number',
    default: '1',
    required: 'false',
    description: '每个单元格在 Y 方向上占多大的格子'
  },
]

</script>

<template>
  <br>

  <h3>{{ '\
      <BentoItem \ />'}} Properties
  </h3>

  <Table>
    <TableCaption />
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          Prop
        </TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Default</TableHead>
        <TableHead>Require</TableHead>
        <TableHead class="text-right">
          Default
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>

      <TableRow v-for="item in list" :key="item.props">
        <TableCell class="font-medium">
          {{ item.props }}
        </TableCell>
        <TableCell>
          {{ item.type }}
        </TableCell>
        <TableHead>
          {{ item.default }}
        </TableHead>
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
