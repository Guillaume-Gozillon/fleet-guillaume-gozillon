export type Page<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
}
export type DeviceType = 'LAPTOP' | 'PERIPHERAL' | 'DISPLAY' | 'OTHER'

export const DEVICE_TYPES: DeviceType[] = [
  'LAPTOP',
  'PERIPHERAL',
  'DISPLAY',
  'OTHER'
]
