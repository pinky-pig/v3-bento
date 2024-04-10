import type { Ref } from 'vue'
import { ref, watch } from 'vue'

export interface BentoCellsType {
  id: string
  x: number
  y: number
  width: number
  height: number
  [key: string]: any
}

const isDragging = ref(false)
let mouseFrom = { x: 0, y: 0 }
let mouseTo = { x: 0, y: 0 }
let area: string[][] = []
export function initGridContainer(
  containerRef: Ref<HTMLElement>,
  bentoCells: Ref<BentoCellsType[]>,
  currentClickedElement: Ref<any>,
  proxyBox: Ref<BentoCellsType>,
  size: number,
  propsOption: any,
  emit: any,
) {
  // 1. 监听拖拽事件返回
  watch(isDragging, (v, o) => {
    if (v) {
      emit('dragStart', currentClickedElement.value)
      // 设置所有的class 为 .bento-item 的 cursor 为 move
      document.body.style.cursor = 'grabbing'
      // const bentoItems: NodeListOf<Element> = document.querySelectorAll('.bento-item')
      // bentoItems.forEach((item: Element) => item.style.cursor = 'grabbing')
    }
    else if (!v) {
      emit('dragEnd', bentoCells.value)
      document.body.style.cursor = 'unset'
    }
  })

  // 2. 监听最大单元格数
  watch(() => propsOption.maximumCells, (v, o) => {
    sortDefault(bentoCells, v)
  })

  // 3. 监听是否禁用
  watch(() => propsOption.disabled, (v, o) => {
    if (v)
      unBindMouseEvent()
    else
      bindMouseEvent()
  }, { immediate: true })

  function bindMouseEvent() {
    window.addEventListener('pointerdown', mousedown, false)
    window.addEventListener('pointermove', mousemove, false)
    window.addEventListener('pointerup', mouseup, false)
  }

  function unBindMouseEvent() {
    window.removeEventListener('pointerdown', mousedown, false)
    window.removeEventListener('pointermove', mousemove, false)
    window.removeEventListener('pointerup', mouseup, false)
  }

  function mousedown(e: MouseEvent) {
    mouseFrom = { x: e.clientX, y: e.clientY }
    currentClickedElement.value = getCellObjectInStoreFromPosition(mouseFrom)
    if (currentClickedElement.value) {
      isDragging.value = true
      // place-holder
      proxyBox.value = Object.assign({ }, currentClickedElement.value)
      // 将当前拖拽的元素放到最上面
      const index = bentoCells.value.findIndex((ele: { id: any }) => ele.id === currentClickedElement.value.id)
      if (index !== -1) {
        const ele = bentoCells.value.splice(index, 1)
        bentoCells.value.push(ele[0])
      }
    }
  }
  function mousemove(e: MouseEvent) {
    mouseTo = { x: e.clientX, y: e.clientY }
    const disX = (mouseTo.x - mouseFrom.x) / size
    const disY = (mouseTo.y - mouseFrom.y) / size
    const rect = containerRef.value?.getBoundingClientRect()
    if (!rect)
      return

    if (isDragging.value) {
      currentClickedElement.value.x += disX
      currentClickedElement.value.y += disY

      // 限制拖拽范围
      if (currentClickedElement.value.x < 0)
        currentClickedElement.value.x = 0
      if (currentClickedElement.value.x + currentClickedElement.value.width > propsOption.maximumCells)
        currentClickedElement.value.x = propsOption.maximumCells - currentClickedElement.value.width
      if (currentClickedElement.value.y < 0)
        currentClickedElement.value.y = 0
      mouseFrom = { x: e.clientX, y: e.clientY }

      proxyBox.value.x = Math.round(currentClickedElement.value.x)
      proxyBox.value.y = Math.round(currentClickedElement.value.y)

      /////////////////////////////////////////////////////////////////////////////////////
      // 1.除了当前拖拽的元素之外的所有元素
      const allCellsWithProxyByCurrent: BentoCellsType[] = []
      bentoCells.value.forEach((item) => {
        if (item.id !== currentClickedElement.value.id)
          allCellsWithProxyByCurrent.push(item)
      })

      // 2.当前的元素要拖拽，于是将当前的元素抽出来，剩下的元素重新排列
      area = getArea(allCellsWithProxyByCurrent)
      const lineCount = area.length
      arrangeByLine()

      // 3.剩下的元素重新排列之后，现在插入当前拖拽的元素
      // 3.1 当前拖拽的元素的位置是四舍五入的 Math.round() ，这里需要将其冒泡到最上面的位置
      // 3.2 冒泡完之后，就是插入。这里插入后，需要将所有的元素重新排列
      // 3.3 重新排列就是将所有碰撞过的元素都下移，这里使用一个递归的方式
      const y = bubbleUp(proxyBox.value, area)
      if (y < proxyBox.value.y)
        proxyBox.value.y = y

      // 将 allCellsWithProxyByCurrent 按照 area 从上至下的顺序重新排列
      const allCellByAreaSort = getAllCellsByArea(area, allCellsWithProxyByCurrent)
      hitAllEle(proxyBox.value, allCellByAreaSort)
      // todo: 需要限制递归深度，避免无限递归导致的性能问题
      // 这里会有个元素重叠的情况。一般情况下，不会出现，因为碰撞走了
      // 但是如果碰撞没有走，那么就会出现重叠的情况，这样这里的递归会一直走，这里需要处理
      function hitAllEle(node: BentoCellsType, allNodes: BentoCellsType[]) {
        // area = getArea(allCellsWithProxyByCurrent)
        const hittedNodes: any = []

        // 1.找到当前元素第一层碰撞的元素
        allNodes.forEach((n: BentoCellsType, index: number) => {
          if (node.id !== n.id && checkHit(node, n)) {
            // 将当前碰撞的要素添加到数组中
            hittedNodes.push(n)
          }
        })
        // 2.碰撞到了之后，一格一格移动
        hittedNodes.forEach((n: BentoCellsType) => {
          for (let h = n.y + 1; h <= node.y + node.height; h++) {
            n.y = h
            // 每次移动一格之后，就来检测一下，是否还有元素被碰撞
            hitAllEle(n, allNodes)
          }
        })
      }
      function getAllCellsByArea(area: string[][], allCells: BentoCellsType[]) {
        const result: BentoCellsType[] = []
        // 数组去重
        Array.from(new Set(area.flat())).forEach((cell: string) => {
          allCells.forEach((n) => {
            if (n.id === cell && result.findIndex((ele: BentoCellsType) => ele.id === n.id) === -1)
              result.push(n)
          })
        })
        return result
      }
      function arrangeByLine() {
        for (let row = 0; row < lineCount; row++) {
          if (area[row] && area[row].length > 0) {
            area[row].forEach((cell: string) => {
              if (cell) {
                allCellsWithProxyByCurrent.forEach((n) => {
                  if (n.id === cell) {
                    const y = bubbleUp(n, area)
                    if (y < n.y)
                      n.y = y
                  }
                })
              }
            })
          }
          area = getArea(allCellsWithProxyByCurrent)
        }
      }
    }
  }
  function mouseup(_e: MouseEvent) {
    if (currentClickedElement.value) {
      currentClickedElement.value.x = proxyBox.value.x
      currentClickedElement.value.y = proxyBox.value.y
      currentClickedElement.value = null
    }
    mouseFrom.x = 0
    mouseFrom.y = 0
    // 拖拽完成后，数组按照布局顺序排列
    bentoCells.value = bentoCells.value.sort((a, b) => {
      if (a.y !== b.y)
        return a.y - b.y // 按照 y 值升序排序
      else
        return a.x - b.x // 在同一行内，按照 x 值升序排序
    })
    isDragging.value = false
  }

  function getCellObjectInStoreFromPosition(position: { x: number; y: number }): Object | null {
    let result: any = null
    const point = { x: position.x, y: position.y }
    const initElement = document.elementFromPoint(point.x, point.y)
    if (initElement)
      result = bentoCells.value.filter((ele: { id: string }) => ele.id === initElement.id)

    return result ? result[0] : null
  }
}

// 贪心算法，遍历每个要素，然后遍历布局，设置默认布局
export function isNeedDefaultLayout(bentoCells: Ref<BentoCellsType[]>, propsOption: any) {
  const overlap = checkOverlap(bentoCells.value)
  const exceedingMaxCells = checkExceedingMaxCells(bentoCells.value, propsOption.maximumCells)

  if (overlap || exceedingMaxCells.length) {
    // 说明有重叠或者是超过了边界
    sortDefault(bentoCells, propsOption.maximumCells)
  }
}
// 默认布局
function sortDefault(bentoCells: Ref<BentoCellsType[]>, maximumCells: number) {
  const totalHeight = bentoCells.value.reduce((sum, item) => sum + item.y + item.height, 0)
  const chessboard: number[][] = new Array(totalHeight).fill(0).map(() => new Array(maximumCells).fill(0))

  /**
   * 1. 先按顺序排列
   * 2. 再一个一个排序
   */

  bentoCells.value = bentoCells.value.sort((a, b) => {
    if (a.y !== b.y)
      return a.y - b.y // 按照 y 值升序排序
    else
      return a.x - b.x // 在同一行内，按照 x 值升序排序
  })

  for (let index = 0; index < bentoCells.value.length; index++) {
    let foundCell = false // 因为 break 只能跳出单个循环，所以用这个变量来跳出双层循环

    for (let row = 0; row < chessboard.length; row++) {
      if (foundCell)
        break

      for (let col = 0; col < chessboard[row].length; col++) {
        // 2x2
        if (bentoCells.value[index].width === 2 && bentoCells.value[index].height === 2) {
          if (chessboard[row][col] === 0
            && chessboard[row][col + 1] === 0
            && chessboard[row + 1][col] === 0
            && chessboard[row + 1][col + 1] === 0) {
            bentoCells.value[index].x = col
            bentoCells.value[index].y = row
            chessboard[row][col] = 1
            chessboard[row][col + 1] = 1
            chessboard[row + 1][col] = 1
            chessboard[row + 1][col + 1] = 1
            foundCell = true
            break
          }
        }
        // 2x1
        if (bentoCells.value[index].width === 2 && bentoCells.value[index].height === 1) {
          if (chessboard[row][col] === 0 && chessboard[row][col + 1] === 0) {
            bentoCells.value[index].x = col
            bentoCells.value[index].y = row
            chessboard[row][col] = 1
            chessboard[row][col + 1] = 1
            foundCell = true
            break
          }
        }
        // 1x2
        if (bentoCells.value[index].width === 1 && bentoCells.value[index].height === 2) {
          if (chessboard[row][col] === 0 && chessboard[row + 1][col] === 0) {
            bentoCells.value[index].x = col
            bentoCells.value[index].y = row
            chessboard[row][col] = 1
            chessboard[row + 1][col] = 1
            foundCell = true
            break
          }
        }
        // 1x1
        if (bentoCells.value[index].width === 1 && bentoCells.value[index].height === 1) {
          if (chessboard[row][col] === 0) {
            bentoCells.value[index].x = col
            bentoCells.value[index].y = row
            chessboard[row][col] = 1
            foundCell = true
            break
          }
        }
      }
    }
  }
}
// 判断传递过来的要素是否有重叠。true表示有重叠，false表示没有重叠
function checkOverlap(elements: BentoCellsType[]): boolean {
  for (let i = 0; i < elements.length; i++) {
    const ele1 = elements[i]
    for (let j = i + 1; j < elements.length; j++) {
      const ele2 = elements[j]
      const xOverlap = ele1.x + ele1.width > ele2.x && ele1.x < ele2.x + ele2.width
      const yOverlap = ele1.y + ele1.height > ele2.y && ele1.y < ele2.y + ele2.height
      if (xOverlap && yOverlap)
        return true
    }
  }
  return false
}
// 将 node 在 area 冒泡向上
function bubbleUp(node: BentoCellsType, area: string[][]) {
  for (let row = node.y - 1; row >= 0; row--) {
    // 如果一整行都为空，则直接继续往上找
    if (area[row] === undefined)
      continue
    for (let col = node.x; col < node.x + node.width; col++) {
      // todo: 这里需要重构，根据当前这个元素的高度，决定返回的行数是多少
      // const count = allCellsWithProxyByCurrent.filter((n: { id: any }) => n.id === area[row][col])[0]?.height
      if (
        area[row]
        && area[row + 1]
        && area[row][col] !== undefined
        && area[row + 1][col] !== undefined
        && area[row][col] === area[row + 1][col]
      ) {
        // 这里是两行的情况
        //  ██ || ██ ██
        //  ██ || ██ ██
      }
      else
      if (area[row][col] !== undefined) {
        // 这里是一行的情况
        // ██ || ██ ██
        return row + 1
      }
    }
  }

  return 0
}
// 返回值为一个二维数组。
// 该函数通过遍历输入的节点数组，将节点的id按照其位置信息记录在返回的二维数组中。
// 具体实现方式为，先遍历每个节点，再通过两层循环分别遍历节点所占据的行和列，
// 最后将该位置上的元素设为当前节点的id。
function getArea(nodes: BentoCellsType[]) {
  const area: any = []
  nodes.forEach((n) => {
    for (let row = n.y; row < n.y + n.height; row++) {
      const rowArr = area[row]
      if (rowArr === undefined)
        area[row] = []

      for (let col = n.x; col < n.x + n.width; col++)
        area[row][col] = n.id
    }
  })
  return area
}
// 检查两个元素是否发生碰撞的功能函数
// 元素 a 的左侧坐标小于元素 b 的右侧坐标。
// 元素 a 的右侧坐标大于元素 b 的左侧坐标。
// 元素 a 的上方坐标小于元素 b 的下方坐标。
// 元素 a 的下方坐标大于元素 b 的上方坐标
function checkHit(a: BentoCellsType, b: BentoCellsType) {
  return (
    a.x < b.x + b.width
          && a.x + a.width > b.x
          && a.y < b.y + b.height
          && a.y + a.height > b.y
  )
}
// 是否有超过边界的值
function checkExceedingMaxCells(bentoCells: BentoCellsType[], maximumCells: number) {
  const exceedingElements: { element: BentoCellsType; type: 'maxX' | 'minX' | 'minY' }[] = []
  bentoCells.forEach((element) => {
    const maxX = element.x + element.width
    const minX = element.x
    const minY = element.y
    switch (true) {
      case maxX > maximumCells:
        exceedingElements.push({
          element,
          type: 'maxX',
        })
        break
      case minX < 0:
        exceedingElements.push({
          element,
          type: 'minX',
        })
        break
      case minY < 0:
        exceedingElements.push({
          element,
          type: 'minY',
        })
        break

      default:
        break
    }
  })
  return exceedingElements
}
