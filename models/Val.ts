import { z } from 'zod'
import { Id } from '../../generic/models/Id'

export const ValSchema = z.string()

export type Val = z.infer<typeof ValSchema>

export function validateVal(val: Val) {
  return ValSchema.parse(val)
}

export function getValUid(val: Val): Id {
  return val
}
