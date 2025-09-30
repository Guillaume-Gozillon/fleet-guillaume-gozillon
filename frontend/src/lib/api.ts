import type { Employee, Device } from '@fleet/shared-types'
import type { Page } from '../interfaces/interface.ts'

const API = import.meta.env.VITE_API_URL ?? '/api'

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  })
  if (!res.ok) {
    let msg = `HTTP ${res.status}`
    try {
      msg = await res.text()
    } catch {}
    throw new Error(msg)
  }
  if (res.status === 204) return undefined as unknown as T
  return (await res.json()) as T
}

export function listEmployees(q?: {
  role?: string
  q?: string
  page?: number
  pageSize?: number
}): Promise<Page<Employee>> {
  const params = new URLSearchParams({
    role: q?.role ?? '',
    q: q?.q ?? '',
    page: String(q?.page ?? 1),
    pageSize: String(q?.pageSize ?? 50)
  })
  return http<Page<Employee>>(`/employees?${params}`)
}
export const createEmployee = (data: { name: string; role: string }) =>
  http<Employee>(`/employees`, { method: 'POST', body: JSON.stringify(data) })
export const updateEmployee = (
  id: number,
  data: Partial<{ name: string; role: string }>
) =>
  http<Employee>(`/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
export const deleteEmployee = (id: number) =>
  http<void>(`/employees/${id}`, { method: 'DELETE' })

export function listDevices(q?: {
  type?: string
  ownerId?: number
  q?: string
  page?: number
  pageSize?: number
}): Promise<Page<Device>> {
  const params = new URLSearchParams({
    type: q?.type ?? '',
    ownerId: q?.ownerId ? String(q.ownerId) : '',
    q: q?.q ?? '',
    page: String(q?.page ?? 1),
    pageSize: String(q?.pageSize ?? 50)
  })
  return http<Page<Device>>(`/devices?${params}`)
}
export const createDevice = (data: {
  name: string
  type: string
  ownerId?: number | null
}) => http<Device>(`/devices`, { method: 'POST', body: JSON.stringify(data) })
export const updateDevice = (
  id: number,
  data: Partial<{ name: string; type: string; ownerId: number | null }>
) =>
  http<Device>(`/devices/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteDevice = (id: number) =>
  http<void>(`/devices/${id}`, { method: 'DELETE' })
