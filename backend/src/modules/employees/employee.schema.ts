import { z } from 'zod'
export const createEmployeeSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    role: z.string().min(1)
  })
})
export const updateEmployeeSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({
    name: z.string().min(1).optional(),
    role: z.string().min(1).optional()
  })
})
