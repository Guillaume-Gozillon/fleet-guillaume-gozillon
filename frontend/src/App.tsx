import { NavLink, Route, Routes } from 'react-router-dom'
import EmployeesPage from './pages/Employees'
import DevicesPage from './pages/Devices'

export default function App() {
  return (
    <div className='layout'>
      <aside className='sidebar'>
        <div className='brand'>Dashboard</div>
        <nav>
          <NavLink
            to='/employees'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Employees
          </NavLink>
          <NavLink
            to='/devices'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Devices
          </NavLink>
        </nav>
      </aside>
      <main className='content'>
        <Routes>
          <Route path='/' element={<DevicesPage />} />
          <Route path='/employees' element={<EmployeesPage />} />
          <Route path='/devices' element={<DevicesPage />} />
        </Routes>
      </main>
    </div>
  )
}
