import { Router } from 'express'
import { DeviceController } from './device.controller'
import { validate } from '../../infra/http/middlewares/validate'
import { createDeviceSchema, updateDeviceSchema } from './device.schema'

const route = Router()

route.get('/', DeviceController.list)
route.post('/', validate(createDeviceSchema), DeviceController.create)
route.put('/:id', validate(updateDeviceSchema), DeviceController.update)
route.delete('/:id', DeviceController.remove)

export default route
