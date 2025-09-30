import { Router } from 'express'
import employeeRoutes from '../../modules/employees/employee.routes'
import deviceRoutes from '../../modules/devices/device.routes'

const route = Router()
route.use('/employees', employeeRoutes)
route.use('/devices', deviceRoutes)

export default route
