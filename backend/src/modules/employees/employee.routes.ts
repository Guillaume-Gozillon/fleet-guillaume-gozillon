import { Router } from 'express'
import { EmployeeController } from './employee.controller'
import { validate } from '../../infra/http/middlewares/validate'
import { createEmployeeSchema, updateEmployeeSchema } from './employee.schema'

const route = Router()

route.get('/', EmployeeController.list)
route.post('/', validate(createEmployeeSchema), EmployeeController.create)
route.put('/:id', validate(updateEmployeeSchema), EmployeeController.update)
route.delete('/:id', EmployeeController.remove)

export default route
