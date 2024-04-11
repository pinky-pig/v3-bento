import { defineComponent, h, markRaw } from 'vue'

export const cfg = [
  { id: '1', x: 0, y: 0, width: 1, height: 1, component: markRaw(createBentoCellComponent('Bento1', '1')) },
  { id: '2', x: 1, y: 0, width: 1, height: 1, component: markRaw(createBentoCellComponent('Bento2', '2')) },
  { id: '3', x: 2, y: 0, width: 2, height: 2, component: markRaw(createBentoCellComponent('Bento3', '3')) },
  { id: '4', x: 3, y: 0, width: 1, height: 2, component: markRaw(createBentoCellComponent('Bento4', '4')) },
  { id: '5', x: 2, y: 1, width: 2, height: 1, component: markRaw(createBentoCellComponent('Bento5', '5')) },
  { id: '6', x: 2, y: 1, width: 2, height: 2, component: markRaw(createBentoCellComponent('Bento6', '6')) },
]

const colors = '64a6bd-90a8c3-ada7c9-d7b9d5-f4cae0-4059ad'.split('-').map(a => `#${a}`)

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
