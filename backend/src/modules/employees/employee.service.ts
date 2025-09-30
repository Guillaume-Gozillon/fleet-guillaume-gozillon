import { EmployeeRepo } from './employee.repository'

function normPage(n: unknown) {
  const v = Number(n)
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : 1
}
function normSize(n: unknown) {
  const v = Number(n)
  const s = Number.isFinite(v) && v > 0 ? Math.floor(v) : 20
  return Math.min(100, s)
}

export const EmployeeService = {
  list: async (p: {
    page?: number
    pageSize?: number
    role?: string
    q?: string
  }) => {
    const page = normPage(p.page)
    const pageSize = normSize(p.pageSize)
    const skip = (page - 1) * pageSize

    const [items, total] = await Promise.all([
      EmployeeRepo.list({ role: p.role, search: p.q, skip, take: pageSize }),
      EmployeeRepo.count({ role: p.role, search: p.q })
    ])

    return { items, total, page, pageSize }
  },

  create: (data: { name: string; role: string }) => EmployeeRepo.create(data),

  update: (id: number, data: { name?: string; role?: string }) =>
    EmployeeRepo.update(id, data),

  remove: (id: number) => EmployeeRepo.remove(id)
}
