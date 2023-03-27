# Configurations

这里展示一些组件的配置，包括设置 拖拽、缩放、吸附功能是否开启，以及一些事件方法。

```vue
<template>
  <V3Dragblock
    class="V3Dragblock"
    :grid-cells="gridCells"
    :draggable="true"
    :resizable="true"
    :adsorbable="true"
    :adsorb-line-style="adsorbLineStyle"
    @dragging="print('dragging', $event)"
    @drag-start="print('drag-start', $event)"
    @drag-end="save('drag-end', $event)"
    @resizing="print('resizing', $event)"
    @resize-start="print('resize-start', $event)"
    @resize-end="save('resize-end', $event)"
  />
</template>
```




## `class="V3Dragblock"`

盒子的类名，用于比如设置拖拽盒子的尺寸或是一些其他 style 样式。子元素位置是在这个盒子内部的，不能超过这个尺寸。

## `:grid-cells="gridCells"`

> 需要用 `ref` 包着，具有响应性。

传入要拖拽的组件数组，要具有以下格式：

```js
import V3Dragblock from 'v3-dragblock'
import GridCellOne from '../components/GridCellOne.vue'
import GridCellTwo from '../components/GridCellTwo.vue'
import GridCellThree from '../components/GridCellThree.vue'
import GridCellFour from '../components/GridCellFour.vue'

const gridCells = ref([
  { id: '0', index: 0, x: 80, y: 310, width: 180, height: 230, component: markRaw(GridCellOne) },
  { id: '1', index: 0, x: 550, y: 95, width: 240, height: 240, component: markRaw(GridCellTwo) },
  { id: '2', index: 0, x: 377, y: 457, width: 305, height: 70, component: markRaw(GridCellThree) },
  { id: '3', index: 0, x: 180, y: 30, width: 130, height: 145, component: markRaw(GridCellFour) },
])
```


| 字段 | 作用 |
| :---: | :--: |
|  id  |   唯一标识  |
|  index  |   层级，两个元素重叠的层级  |
|  x |   离盒子的左边距离  |
|  y |    离盒子的上边距离  |
|  width |   元素的宽度  |
|  height |  元素的高度  |
|  component |  自定义的组件  |


## `:draggable="true" | :resizable="true" | :adsorbable="true"`

| Props | 作用 | 默认|
| :---: | :--: |:--: |
|  draggable  |   拖拽  |true  ( 启用 ) |
|  resizable  |   缩放  |true  ( 启用 ) |
|  adsorbable |   吸附  |true  ( 启用 ) |

## `:adsorb-line-style="adsorbLineStyle"`

开启吸附功能的时候，吸附线的样式

```js
const adsorbLineStyle = {
  stroke: 'black',
  fill: 'black',
  strokeWidth: 2,
}
```

## `@dragging | @resizing | @drag-start | @resize-start| @drag-end|@resize-end`

| handles | 作用 | 返回值|
| :---: | :--: |:--: |
|  @dragging  |   正在拖拽  | 当前对象 |
|  @resizing  |   正在缩放  | 当前对象 |
|  @drag-start |   拖拽开始  | 当前对象 |
|  @resize-start |   缩放开始  | 当前对象 |
|  @drag-end |   拖拽结束  | 所有对象的信息 |
|  @resize-end |   缩放结束  | 所有对象的信息 |
 

