import { Request, Response, NextFunction } from 'express'
import { EmployeeService } from './employee.service'

export const EmployeeController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, pageSize, role, q } = req.query
      const data = await EmployeeService.list({
        page: Number(page),
        pageSize: Number(pageSize),
        role: role as string,
        q: q as string
      })
      res.json(data)
    } catch (e) {
      next(e)
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(201).json(await EmployeeService.create(req.body))
    } catch (e) {
      next(e)
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await EmployeeService.update(Number(req.params.id), req.body))
    } catch (e) {
      next(e)
    }
  },
  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(204).send(await EmployeeService.remove(Number(req.params.id)))
    } catch (e) {
      next(e)
    }
  }
}
