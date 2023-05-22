import { z } from 'zod'

export const TypeNameSchema = z.string()

export type TypeName = z.infer<typeof TypeNameSchema>
