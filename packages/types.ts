import type { Component, Raw } from 'vue'

/**
 * JS 操作的数组类型
 */
export interface BentoItemType {
  id: string
  x: number
  y: number
  width: number
  height: number
  index: number
  components?: Raw<Component<any>>
  [key: string]: any
}

/**
 * 渲染的 BentoItem 组件类型
 */
export type BentoItemProps = Pick<BentoItemType, 'id' | 'x' | 'y' | 'width' | 'height' | 'index'>

/**
 * 渲染的 BentoItem 组件类型
 */
export interface BentoProps {
  // 是否显示关闭按钮
  bentoCells: BentoItemType[]
  // 格子的大小
  size?: number
  // 每一行最大格子数量
  maximumCells?: number
  // 格子的间距
  gap?: number
  // 是否禁用拖拽
  disabled?: boolean
  // 格子类名
  commonClass?: string
  // 格子随拖拽速度倾斜的角度级别
  rotateType?: 'light' | 'medium' | 'heavy' | 'none'
}

/**
 *  BentoItem 倾斜
 */
export interface BentoItemRotateParameter {
  maxVelocity: number
  maxRotation: number
  rotationFactor: number
}
