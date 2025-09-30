import { DeviceRepo } from './device.repository'

function normPage(n: unknown) {
  const v = Number(n)
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : 1
}
function normSize(n: unknown) {
  const v = Number(n)
  const s = Number.isFinite(v) && v > 0 ? Math.floor(v) : 20
  return Math.min(100, s)
}

export const DeviceService = {
  list: async (p: {
    page?: unknown
    pageSize?: unknown
    type?: string
    ownerId?: number
    q?: string
  }) => {
    const page = normPage(p.page)
    const pageSize = normSize(p.pageSize)
    const skip = (page - 1) * pageSize

    const [items, total] = await Promise.all([
      DeviceRepo.list({
        type: p.type,
        ownerId: p.ownerId,
        search: p.q,
        skip,
        take: pageSize
      }),
      DeviceRepo.count({ type: p.type, ownerId: p.ownerId, search: p.q })
    ])

    return { items, total, page, pageSize }
  },

  create: (data: { name: string; type: any; ownerId?: number | null }) =>
    DeviceRepo.create(data),

  update: (
    id: number,
    data: { name?: string; type?: any; ownerId?: number | null }
  ) => DeviceRepo.update(id, data),

  remove: (id: number) => DeviceRepo.remove(id)
}
