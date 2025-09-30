import { useEffect, useMemo, useState } from 'react'

import {
  createEmployee,
  deleteEmployee,
  listEmployees,
  updateEmployee
} from '../lib/api'
import Confirm from '../components/Confirm'
import type { Employee } from '@fleet/shared-types'
import type { Page } from '../interfaces/interface.ts'

export default function EmployeesPage() {
  const [role, setRole] = useState<string>('')
  const [q, setQ] = useState<string>('')
  const [data, setData] = useState<Page<Employee>>({
    items: [],
    total: 0,
    page: 1,
    pageSize: 50
  })
  const [loading, setLoading] = useState(false)

  const roles = useMemo(
    () => Array.from(new Set(data.items.map(e => e.role))).sort(),
    [data.items]
  )

  async function refresh(page = 1) {
    setLoading(true)
    try {
      setData(
        await listEmployees({
          role: role || undefined,
          q: q || undefined,
          page
        })
      )
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    refresh(1)
  }, [role])

  async function onAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '').trim()
    const r = String(form.get('role') || '').trim()
    if (!name || !r) return
    await createEmployee({ name, role: r })
    e.currentTarget.reset()
    setQ('')
    setRole('')
    await refresh(1)
  }

  return (
    <div className='card'>
      <h2 style={{ marginTop: 0 }}>Employee Management</h2>

      <div className='row' style={{ marginBottom: 12 }}>
        <input
          className='input'
          placeholder='Search name'
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value=''>All roles</option>
          {roles.map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button className='ghost' onClick={() => refresh(1)}>
          Search
        </button>
        <div className='right'></div>
        <form className='hstack' onSubmit={onAdd}>
          <input name='name' className='input' placeholder='Full name' />
          <input
            name='role'
            className='input'
            placeholder='Role (Developer...)'
          />
          <button type='submit'>Add</button>
        </form>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th className='right'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>
                <span className='badge'>{emp.role}</span>
              </td>
              <td className='actions'>
                <button
                  className='ghost'
                  onClick={async () => {
                    const name = prompt('New name', emp.name) ?? ''
                    const roleNew = prompt('New role', emp.role) ?? ''
                    if (!name.trim() || !roleNew.trim()) return
                    await updateEmployee(emp.id, {
                      name: name.trim(),
                      role: roleNew.trim()
                    })
                    refresh(data.page)
                  }}
                >
                  Edit
                </button>
                <Confirm
                  ask='Delete employee?'
                  onYes={async () => {
                    await deleteEmployee(emp.id)
                    refresh(data.page)
                  }}
                />
              </td>
            </tr>
          ))}
          {!loading && data.items.length === 0 && (
            <tr>
              <td colSpan={3}>No employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
