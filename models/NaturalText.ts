import { z } from 'zod'
import { Id } from '../../generic/models/Id'

export const NaturalTextSchema = z.string().min(1)

export type NaturalText = z.infer<typeof NaturalTextSchema>

export function validateNaturalText(text: NaturalText) {
  return NaturalTextSchema.parse(text)
}

export function getNaturalTextUid(text: NaturalText): Id {
  return text
}
