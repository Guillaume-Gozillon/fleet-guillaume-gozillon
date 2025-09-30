export type { Prisma, Employee, Device } from '@prisma/client'

export interface UserDTO {
  id: number
  email: string
  name?: string | null
  createdAt: string
}
