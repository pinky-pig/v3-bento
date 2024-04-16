<script setup lang="ts">
const list = [
  {
    props: 'bentoCells',
    type: 'BentoCellsType[]',
    default: '',
    required: 'true',
    description: '每个格子',
  },
  {
    props: 'maximumCells',
    type: 'number',
    default: '',
    required: 'true',
    description: '每一行最大格子数量',
  },
  {
    props: 'size',
    type: 'number',
    default: '',
    required: 'true',
    description: '格子的大小',
  },
  {
    props: 'gap',
    type: 'number',
    default: '10',
    required: 'false',
    description: '格子的间距',
  },
  {
    props: 'disabled',
    type: 'boolean',
    default: 'false',
    required: 'false',
    description: '是否禁用拖拽',
  },
  {
    props: 'commonClass',
    type: 'string',
    default: '\`bento-item\`',
    required: 'false',
    description: '格子的类名',
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
