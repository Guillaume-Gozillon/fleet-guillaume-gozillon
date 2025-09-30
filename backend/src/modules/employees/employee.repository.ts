import { prisma } from '../../infra/db/prisma'

const isNum = (x: any) => typeof x === 'number' && Number.isFinite(x)
const str = (s?: string | null) => (s && s.trim() !== '' ? s.trim() : undefined)

export const EmployeeRepo = {
  list: (q?: {
    role?: string
    search?: string
    skip?: number
    take?: number
  }) =>
    prisma.employee.findMany({
      where: {
        role: str(q?.role),
        name: str(q?.search) ? { contains: str(q?.search)! } : undefined
      },
      orderBy: { id: 'desc' },
      ...(isNum(q?.skip) ? { skip: q!.skip } : {}),
      ...(isNum(q?.take) ? { take: q!.take } : {})
    }),

  count: (q?: { role?: string; search?: string }) =>
    prisma.employee.count({
      where: {
        role: str(q?.role),
        name: str(q?.search) ? { contains: str(q?.search)! } : undefined
      }
    }),

  // byId: (id: number) => prisma.employee.findUnique({ where: { id } }),
  create: (data: { name: string; role: string }) =>
    prisma.employee.create({ data }),

  update: (id: number, data: Partial<{ name: string; role: string }>) =>
    prisma.employee.update({ where: { id }, data }),

  remove: (id: number) => prisma.employee.delete({ where: { id } })
}
