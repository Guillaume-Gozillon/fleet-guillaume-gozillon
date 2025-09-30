import { z } from 'zod'

export const createDeviceSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    type: z.enum(['LAPTOP', 'PERIPHERAL', 'DISPLAY', 'OTHER']),
    ownerId: z.number().int().nullable().optional()
  })
})
export const updateDeviceSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({
    name: z.string().min(1).optional(),
    type: z.enum(['LAPTOP', 'PERIPHERAL', 'DISPLAY', 'OTHER']).optional(),
    ownerId: z.number().int().nullable().optional()
  })
})
