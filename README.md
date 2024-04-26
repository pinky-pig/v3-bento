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

## Source Code

1. Run code: npm run dev
2. Package lib: npm run build:lib
3. Release lib: npm run release:lib
4. Package documents: npm run build
5. Preview documents: npm run preview

<details>

<summary>中文</summary>

1. 运行代码： npm run dev
2. 打包 lib ： npm run build:lib
3. 发包 lib ： npm run release:lib
4. 打包文档： npm run build
5. 预览文档： npm run preview

</details>
