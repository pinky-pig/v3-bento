

<div align="center">
	<h1 style="margin:10px">v3-bento</h1>
	<h6 align="center">Component based in Vue3</h6>
</div>


# 🌸 Get Started

<p align="center">
<img src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/imagesbento.gif"  height="300">
</p>

使用 v3-bento 开发的示例。   
使用文档地址：[Document](https://what-is-v3-bento.vercel.app/)  
Versel 演示地址： [Demo - Vercel](https://v3-bento-demo.vercel.app/)  
Github 代码地址： [Demo -Github](https://github.com/pinky-pig/what-is-drag-resize-attached-card)

## 🎉 Introduce

V3-bento 是一个基于 Vue3 的拖拽组件，灵感来自 [Bento](https://bento.me/pinky-pig) ， 不过只是简化版，思路就是父容器相对定位，子容器绝对定位。
拖拽格子，使用 `Math.round` 进行四舍五入，然后通过 `left` `top` 进行移动。碰撞检测后，将当前的元素插入，之前的元素向下。
支持拖拽移动、自动默认布局。目前初始版本暂时只支持 Vue3 版本，而且具有很多优化空间。

## 🏄‍♂️ Feature

- 可配置 size 、 maximum-cells 、gap
- 可传入 drag-start 和 drag-end 事件


## 👊 Todo

- [ ] 简化组织代码
- [ ] 适配 Vue2 
- [ ] 适配 React 

## 🍄 Usage Steps

```bash
npm i v3-bento
```

如果已经经过 `npm i v3-bento`，那么下面就开始使用。
仅仅只需要，在需要的组件中 `import V3bento from 'v3-bento'` 后，定义子项组件传入 `V3bento` 后就可以使用。
当然需要通过 `CSS` 设置拖拽画布的大小。如果有不太理解的可以参考上面的 [Demo Github](https://github.com/pinky-pig/what-is-drag-resize-attached-card)


```vue
<script setup lang="ts">
import { defineComponent, h, markRaw } from 'vue'
import Bento from '../../packages/v3-bento/src'
const cfgCells = [
  { id: '1', x: 0, y: 0, width: 1, height: 1, component: markRaw(createBentoCellComponent('Bento1', '1')) },
  { id: '2', x: 1, y: 0, width: 1, height: 1, component: markRaw(createBentoCellComponent('Bento2', '2')) },
  { id: '3', x: 2, y: 0, width: 2, height: 2, component: markRaw(createBentoCellComponent('Bento3', '3')) },
  { id: '4', x: 3, y: 0, width: 2, height: 2, component: markRaw(createBentoCellComponent('Bento4', '4')) },
  { id: '5', x: 2, y: 1, width: 2, height: 1, component: markRaw(createBentoCellComponent('Bento5', '5')) },
  { id: '6', x: 2, y: 1, width: 2, height: 1, component: markRaw(createBentoCellComponent('Bento6', '6')) },
]

// 创建组件
const colors = 'cae7b9-f3de8a-eb9486-7e7f9a-97a7b3-4059ad'.split('-').map(a => `#${a}`)
function createBentoCellComponent(name: string, content: string) {
  return defineComponent({
    name,
    setup() {
      return () => h(
        'div',
        {
          style: `
            background: ${colors[Number(content) - 1]};
            display: grid;
            place-items: center;
            font-size: 48px;
            user-select: none;
          `,
        },
        content)
    },
  })
}
const print = (val: string, e: any) => {
  console.log(val, e)
}
</script>

<template>
  <div class="container">
    <V3bento
      class="bento-container"
      :bento-cells="cfgCells"
      :size="100"
      :gap="10"
      :maximum-cells="4"
      @drag-start="print('drag-start', $event)"
      @drag-end="print('drag-end', $event)"
    />
  </div>
</template>

<style scoped>
.container {
  height: 60vh;
  width: 80vw;
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  place-items: center;
}
.bento-container{
  border: 1px solid rgb(176, 108, 108);
  margin-left: auto;
  margin-right: auto;
}
</style>
```

## ⚡ Configurations

这里展示一些组件的配置，包括设置格子尺寸大小、间隔，以及一些事件方法。

```vue
<template>
  <div class="container">
    <V3bento
      class="bento-container"
      :bento-cells="cfgCells"
      :size="100"
      :gap="10"
      :maximum-cells="4"
      @drag-start="print('drag-start', $event)"
      @drag-end="print('drag-end', $event)"
    />
  </div>
</template>
```
### 🍕 `:bento-cells="cfgCells"`

> 需要用 `ref` 包着，具有响应性。

传入要拖拽的组件数组，要具有以下格式：

```js
import V3bento from 'v3-bento'
import componentOne from '../components/componentOne.vue'
import componentTwo from '../components/componentTwo.vue'

const cfgCells = [
  { id: '1', x: 0, y: 0, width: 1, height: 1, component: markRaw(componentOne) },
  { id: '2', x: 1, y: 0, width: 1, height: 1, component: markRaw(componentTwo) },
]
```

| 字段 | 作用 |
| :---: | :--: |
|  id  |   唯一标识  |
|  x |   离盒子的左边距离  |
|  y |    离盒子的上边距离  |
|  width |   元素的宽度  |
|  height |  元素的高度  |
|  component |  自定义的组件  |

### 🍔 `:size="100"`

每个格子的单位像素大小。因为传入的组件的格子用个位数表示，这里的size就是每个格子的像素，即实际的大小可能为 size * width | height。

### 🍟 `:gap="10"`

每个格子的之间的间隔，这里的 `10` 相当于 `10px`。

### 🍿 `:maximum-cells="4"`

每行最大格子数，超过这个数就会换行。


### 🍳 `@drag-start | @drag-end`

| handles | 作用 | 返回值|
| :---: | :--: |:--: |
|  @drag-start |   拖拽开始  | 当前对象 |
|  @drag-end   |   拖拽结束  | 所有对象的信息 |
 

