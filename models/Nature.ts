import { todo } from 'libs/utils/todo'
import { z } from 'zod'
import { Id } from '../../generic/models/Id'

export const NatureSchema = z.enum(todo<[string, ...string[]]>([
  'scalar',
  'function',
  // specific scalars
  'scalar/boolean',
  'scalar/number',
  'scalar/string',
  'scalar/array',
  'scalar/record',
  // specific scalar numbers
  'scalar/number/integer',
  'scalar/number/float',
  // ...
  // dependent types (e.g. "array of integers" are not supported)
]))

export type Nature = z.infer<typeof NatureSchema>

export function validateNature(nature: Nature) {
  return NatureSchema.parse(nature)
}

export function getNatureUid(nature: Nature): Id {
  return nature
}
