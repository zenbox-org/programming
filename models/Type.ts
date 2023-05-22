import { z } from 'zod'
import { Id } from '../../generic/models/Id'
import { NatureSchema } from './Nature'
import { TypeNameSchema } from './TypeName'

export const TypeSchema = z.object({
  name: TypeNameSchema,
  nature: NatureSchema,
})

export type Type = z.infer<typeof TypeSchema>

export function validateType(type: Type) {
  return TypeSchema.parse(type)
}

export function getTypeUid(type: Type): Id {
  return type.name
}
