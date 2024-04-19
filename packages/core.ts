import type { Ref } from 'vue'
import { watch } from 'vue'
import type { BentoItemProps, BentoItemRotateParameter, BentoItemType } from './types'

let mouseFrom = { x: 0, y: 0 }
let mouseTo = { x: 0, y: 0 }
let area: string[][] = []

/** moveStartTime 和 moveCounter 是为了移动的元素倾斜所添加的 */
let moveStartTime = performance.now()
let moveCounter = 0

export function initGridContainer(
  containerRef: Ref<HTMLElement>,
  bentoCells: Ref<BentoItemProps[]>,
  currentClickedElement: Ref<BentoItemType | null>,
  proxyBox: Ref<BentoItemProps>,
  size: number,
  propsOption: any,
  emit: any,
  isDragging: Ref<boolean>,
  bentoItemRotateCfg: BentoItemRotateParameter,
) {
  // 1. 监听拖拽事件返回
  watch(isDragging, (v, _o) => {
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
  watch(() => propsOption.maximumCells, (v, _o) => {
    sortDefault(bentoCells, v)
  })

  // 3. 监听是否禁用
  watch(() => propsOption.disabled, (v, _o) => {
    if (v)
      unBindMouseEvent()
    else
      bindMouseEvent()
  }, { immediate: true })

  // 4. 解决拖拽到图片的默认行为
  containerRef.value.addEventListener('pointerdown', (e: MouseEvent) => {
    e.preventDefault()
  }, false)

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
    }
  }
  function mousemove(e: MouseEvent) {
    const rect = containerRef.value?.getBoundingClientRect()
    if (!rect)
      return
    if (!currentClickedElement.value)
      return

    // === 倾斜 start === //
    if (propsOption.rotate !== 'none') {
      const { velocity } = calVelocity(mouseTo.x, e.clientX, moveStartTime)
      const { maxVelocity, maxRotation, rotationFactor } = bentoItemRotateCfg
      const rotate = -(velocity / maxVelocity * maxRotation * rotationFactor)
      // 每30次更新一次角度
      if (moveCounter >= 10) {
        currentClickedElement.value.rotate = Number(rotate.toFixed(2))
        moveCounter = 0 // 重置计数器
      }
      else {
        moveCounter++ // 计数器加一
      }
      moveStartTime = performance.now()
    }
    // === 倾斜 end === //

    mouseTo = { x: e.clientX, y: e.clientY }

    const disX = (mouseTo.x - mouseFrom.x) / size
    const disY = (mouseTo.y - mouseFrom.y) / size

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
      const allCellsWithProxyByCurrent: BentoItemProps[] = []
      bentoCells.value.forEach((item) => {
        if (item.id !== currentClickedElement.value?.id)
          allCellsWithProxyByCurrent.push(item)
      })

      // 2.当前的元素要拖拽，于是将当前的元素抽出来，剩下的元素重新排列
      area = getArea(allCellsWithProxyByCurrent)
      const lineCount = area.length
      arrangeByLine(lineCount, allCellsWithProxyByCurrent)

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
    }
    // todo: 需要限制递归深度，避免无限递归导致的性能问题
    // 这里会有个元素重叠的情况。一般情况下，不会出现，因为碰撞走了
    // 但是如果碰撞没有走，那么就会出现重叠的情况，这样这里的递归会一直走，这里需要处理
    function hitAllEle(node: BentoItemProps, allNodes: BentoItemProps[]) {
      // area = getArea(allCellsWithProxyByCurrent)
      const hittedNodes: any = []

      // 1.找到当前元素第一层碰撞的元素
      allNodes.forEach((n: BentoItemProps, _index: number) => {
        if (node.id !== n.id && checkHit(node, n)) {
          // 将当前碰撞的要素添加到数组中
          hittedNodes.push(n)
        }
      })
      // 2.碰撞到了之后，一格一格移动
      hittedNodes.forEach((n: BentoItemProps) => {
        for (let h = n.y + 1; h <= node.y + node.height; h++) {
          n.y = h
          // 每次移动一格之后，就来检测一下，是否还有元素被碰撞
          hitAllEle(n, allNodes)
        }
      })
    }
    function getAllCellsByArea(area: string[][], allCells: BentoItemProps[]) {
      const result: BentoItemProps[] = []
      // 数组去重
      Array.from(new Set(area.flat())).forEach((cell: string) => {
        allCells.forEach((n) => {
          if (n.id === cell && result.findIndex((ele: BentoItemProps) => ele.id === n.id) === -1)
            result.push(n)
        })
      })
      return result
    }
    function arrangeByLine(lineCount: number, allCellsWithProxyByCurrent: BentoItemProps[]) {
      for (let row = 0; row < lineCount; row++) {
        if (area[row] !== undefined && area[row].length > 0) {
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
  function mouseup(_e: MouseEvent) {
    if (currentClickedElement.value) {
      currentClickedElement.value.x = proxyBox.value.x
      currentClickedElement.value.y = proxyBox.value.y
      currentClickedElement.value = null
    }
    mouseFrom.x = 0
    mouseFrom.y = 0

    setBentoCellsIndex(bentoCells)
    // 拖拽完成后，数组按照布局顺序排列
    isDragging.value = false
  }

  function getCellObjectInStoreFromPosition(position: { x: number, y: number }): BentoItemType | null {
    let result: any = null
    const point = { x: position.x, y: position.y }
    let initElement = document.elementFromPoint(point.x, point.y)

    // 逐级向上查找父元素，直到找到包含指定类名的元素或到达根元素
    while (initElement && !initElement.classList.contains(propsOption.commonClass))
      initElement = initElement.parentElement

    // 要是找得到就继续下面的逻辑了
    if (initElement !== null && initElement.id)
      result = bentoCells.value.filter((ele: { id: string }) => (`${propsOption.commonClass}-${ele.id}`) === initElement?.id)

    return result ? result[0] : null
  }
}

// 贪心算法，遍历每个要素，然后遍历布局，设置默认布局
export function setBentoCellsIndex(bentoCells: Ref<BentoItemProps[]>) {
  const temp = bentoCells.value.map(item => item)
  temp.sort((a, b) => {
    if (a.y !== b.y)
      return a.y - b.y // 按照 y 值升序排序
    else
      return a.x - b.x // 在同一行内，按照 x 值升序排序
  })

  const tempMap = new Map(temp.map((item, index) => [item.id, index]))
  bentoCells.value.forEach((item) => {
    const tempIndex = tempMap.get(item.id)
    if (tempIndex !== undefined)
      item.index = tempIndex
  })
}

// 贪心算法，遍历每个要素，然后遍历布局，设置默认布局
export function isNeedDefaultLayout(bentoCells: Ref<BentoItemProps[]>, propsOption: any) {
  const overlap = checkOverlap(bentoCells.value)
  const exceedingMaxCells = checkExceedingMaxCells(bentoCells.value, propsOption.maximumCells)

  if (overlap || exceedingMaxCells.length) {
    // 说明有重叠或者是超过了边界
    sortDefault(bentoCells, propsOption.maximumCells)
  }
}
// 默认布局
// 默认布局
export function sortDefault(bentoCells: Ref<BentoItemProps[]>, maximumCells: number) {
  const totalHeight = bentoCells.value.reduce((sum, item) => sum + item.y + item.height, 0)
  const chessboard: number[][] = Array.from({ length: totalHeight }).fill(0).map(() => Array.from({ length: maximumCells }).fill(0)) as number[][]

  /**
   * 1. 已知每个元素的 index 值
   * 2. 按照 index 的值从开始排列
   */
  setBentoCellsIndex(bentoCells)

  // 首先创建一个中间变量 temp
  // 然后记住 id 和原来的 index
  // 然后将 temp 按照 index 值从开始排列
  // 然后再遍历 temp ，如果需要获取原来的对象的话，先通过 id 取出 index ，再获取
  const temp = bentoCells.value.map(item => item)
  const tempMap = new Map(temp.map((item, index) => [item.id, index]))
  temp.sort((a, b) => {
    if (a.y !== b.y)
      return a.y - b.y // 按照 y 值升序排序
    else
      return a.x - b.x // 在同一行内，按照 x 值升序排序
  })
  for (let index = 0; index < temp.length; index++) {
    let foundCell = false // 因为 break 只能跳出单个循环，所以用这个变量来跳出双层循环

    for (let row = 0; row < chessboard.length; row++) {
      if (foundCell)
        break

      for (let col = 0; col < chessboard[row].length; col++) {
        const width = temp[index].width
        const height = temp[index].height

        // 检查当前形状的格子是否可用
        let available = true
        for (let r = row; r < row + height; r++) {
          for (let c = col; c < col + width; c++) {
            if (chessboard[r][c] !== 0) {
              available = false
              break
            }
          }
          if (!available)
            break
        }

        // 如果当前形状的格子可用，则设置位置并更新棋盘
        if (available) {
          const realIndex = tempMap.get(temp[index].id)
          if (realIndex !== undefined) {
            bentoCells.value[realIndex].x = col
            bentoCells.value[realIndex].y = row
          }
          for (let r = row; r < row + height; r++) {
            for (let c = col; c < col + width; c++)
              chessboard[r][c] = 1
          }
          foundCell = true
          break
        }
      }
    }
  }
}
// 判断传递过来的要素是否有重叠。true表示有重叠，false表示没有重叠
function checkOverlap(elements: BentoItemProps[]): boolean {
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
function bubbleUp(node: BentoItemProps, area: string[][]) {
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
function getArea(nodes: BentoItemProps[]) {
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
function checkHit(a: BentoItemProps, b: BentoItemProps) {
  return (
    a.x < b.x + b.width
    && a.x + a.width > b.x
    && a.y < b.y + b.height
    && a.y + a.height > b.y
  )
}
// 是否有超过边界的值
function checkExceedingMaxCells(bentoCells: BentoItemProps[], maximumCells: number) {
  const exceedingElements: { element: BentoItemProps, type: 'maxX' | 'minX' | 'minY' }[] = []
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
function calVelocity(lastX: number, currentX: number, lastTime: number, currentTime = performance.now()) {
  const distanceX = currentX - lastX
  const deltaTime = currentTime - lastTime
  return {
    velocity: distanceX / deltaTime,
    newTime: currentTime,
    newX: currentX,
  }
}
