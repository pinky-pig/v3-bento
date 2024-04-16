# V3-Bento

<p align='center'>
  <img src='https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/imagesv3-bento.gif' alt='v3-bento' width='600'/>
</p>

> A simple bento layout component for Vue3.

**Document:** <https://v3bento.mmeme.me/>

## 🌸 Get Started

```bash
pnpm install v3-bento
```

## 🍄 Usage

```
<Bento
  :bentoCells="bentoCells"
  class="!h-[610px] overflow-y-auto overflow-x-hidden p-[10px] box-content"
  :size="140"
  :disabled="false"
  :gap="10"
  :maximum-cells="4"
  @drag-end="(e: any) => console.log(e)"
  @drag-start="(e: any) => console.log(e)"
>
  <BentoItem
    v-for="item in bentoCells"
    :key="item.id"
    :id="item.id"
    :x="item.x"
    :y="item.y"
    :width="item.width"
    :height="item.height"
  >
    <Cell :url="'./' + item.id + '.svg'" :bg="'#fff'" />
  </BentoItem>
</Bento>
```
