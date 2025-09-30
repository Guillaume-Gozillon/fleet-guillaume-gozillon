import { NextFunction, Request, Response } from 'express'

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const code = err.status ?? 500

  res.status(code).json({ error: err.message ?? 'internal_error' })
}
