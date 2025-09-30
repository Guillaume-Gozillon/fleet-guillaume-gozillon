import { type FormEvent, useEffect, useMemo, useState } from 'react'
import {
  createDevice,
  deleteDevice,
  listDevices,
  listEmployees,
  updateDevice
} from '../lib/api'
import type { Employee, Device } from '@fleet/shared-types'
import type { Page, DeviceType } from '../interfaces/interface.ts'

const types: DeviceType[] = ['LAPTOP', 'PERIPHERAL', 'DISPLAY', 'OTHER']

export default function DevicesPage() {
  const [type, setType] = useState<string>('')
  const [ownerId, setOwnerId] = useState<string>('')
  const [q, setQ] = useState<string>('')
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Page<Device>>({
    items: [],
    total: 0,
    page: 1,
    pageSize: 50
  })

  async function refresh(page = 1) {
    setLoading(true)
    try {
      const res = await listDevices({
        type: type || undefined,
        ownerId: ownerId ? Number(ownerId) : undefined,
        q: q || undefined,
        page
      })
      setData(res)
    } catch (e: unknown) {
      setData({ items: [], total: 0, page: 1, pageSize: 50 })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh(1)
    ;(async () => {
      try {
        const res = await listEmployees({ pageSize: 1000 })
        setEmployees(res.items)
      } catch {}
    })()
  }, [type, ownerId])

  const ownersMap = useMemo(
    () => new Map(employees.map(e => [e.id, e])),
    [employees]
  )

  async function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') || '').trim()
    const t = String(f.get('type') || '').trim()
    const o = String(f.get('ownerId') || '').trim()
    if (!name || !t) return
    await createDevice({ name, type: t, ownerId: o ? Number(o) : null })
    e.currentTarget.reset()
    refresh()
  }

  return (
    <div className='card'>
      <h2 style={{ marginTop: 0 }}>Device Management</h2>

      <div className='row' style={{ marginBottom: 12 }}>
        <input
          className='input'
          placeholder='Device Name'
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value=''>Select Type</option>
          {types.map(t => (
            <option key={t} value={t}>
              {t.charAt(0) + t.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <select value={ownerId} onChange={e => setOwnerId(e.target.value)}>
          <option value=''>Select Owner</option>
          {employees.map(e => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        <button className='ghost' onClick={() => refresh(1)}>
          Search
        </button>

        <div className='right'></div>
        <form className='hstack' onSubmit={onAdd}>
          <input name='name' className='input' placeholder='New device name' />
          <select name='type' defaultValue=''>
            <option value='' disabled>
              Type
            </option>
            {types.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select name='ownerId' defaultValue=''>
            <option value=''>No owner</option>
            {employees.map(e => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <button type='submit'>Add Device</button>
        </form>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Owner</th>
            <th className='right'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.type}</td>
              <td>
                {d.ownerId ? (ownersMap.get(d.ownerId)?.name ?? '—') : '—'}
              </td>
              <td className='actions'>
                <button
                  className='ghost'
                  onClick={async () => {
                    const name = prompt('New name', d.name) ?? ''
                    const t =
                      prompt(
                        'Type (LAPTOP, PERIPHERAL, DISPLAY, OTHER)',
                        d.type
                      ) ?? ''
                    const owner =
                      prompt(
                        'OwnerId (empty for none)',
                        d.ownerId ? String(d.ownerId) : ''
                      ) ?? ''
                    if (!name.trim() || !t.trim()) return
                    await updateDevice(d.id, {
                      name: name.trim(),
                      type: t.trim(),
                      ownerId: owner ? Number(owner) : null
                    })
                    refresh(data.page)
                  }}
                >
                  Edit
                </button>
                <button
                  className='ghost'
                  onClick={async () => {
                    await deleteDevice(d.id)
                    refresh(data.page)
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {!loading && data.items.length === 0 && (
            <tr>
              <td colSpan={4}>No devices</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
