import { prisma } from '../../infra/db/prisma'

const isNum = (x: any) => typeof x === 'number' && Number.isFinite(x)
const str = (s?: string | null) => (s && s.trim() !== '' ? s.trim() : undefined)

export const DeviceRepo = {
  list: (q?: {
    type?: string
    ownerId?: number
    search?: string
    skip?: number
    take?: number
  }) =>
    prisma.device.findMany({
      where: {
        type: str(q?.type) as any,
        ownerId: isNum(q?.ownerId) ? q!.ownerId! : undefined,
        name: str(q?.search) ? { contains: str(q?.search)! } : undefined
      },
      include: { owner: true },
      orderBy: { id: 'desc' },
      ...(isNum(q?.skip) ? { skip: q!.skip } : {}),
      ...(isNum(q?.take) ? { take: q!.take } : {})
    }),

  count: (q?: { type?: string; ownerId?: number; search?: string }) =>
    prisma.device.count({
      where: {
        type: str(q?.type) as any,
        ownerId: isNum(q?.ownerId) ? q!.ownerId! : undefined,
        name: str(q?.search) ? { contains: str(q?.search)! } : undefined
      }
    }),

  create: (data: { name: string; type: any; ownerId?: number | null }) =>
    prisma.device.create({ data }),

  update: (
    id: number,
    data: Partial<{ name: string; type: any; ownerId: number | null }>
  ) => prisma.device.update({ where: { id }, data }),

  remove: (id: number) => prisma.device.delete({ where: { id } })
}
