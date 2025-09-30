import { Request, Response, NextFunction } from 'express'
import { DeviceService } from './device.service'

export const DeviceController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, pageSize, type, ownerId, q } = req.query
      const data = await DeviceService.list({
        page: Number(page),
        pageSize: Number(pageSize),
        type: type as string,
        ownerId: ownerId ? Number(ownerId) : undefined,
        q: q as string
      })
      res.json(data)
    } catch (e) {
      next(e)
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(201).json(await DeviceService.create(req.body))
    } catch (e) {
      next(e)
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await DeviceService.update(Number(req.params.id), req.body))
    } catch (e) {
      next(e)
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await DeviceService.remove(Number(req.params.id))
      res.status(204).send()
    } catch (e) {
      next(e)
    }
  }
}
