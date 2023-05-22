import { NotesSchema } from 'libs/generic/models/Notes'
import { isEqualByDC } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { TypeSchema } from './Type'

// Using short names to avoid collision with keywords
export const VarSchema = z.object({
  name: z.string(),
  type: TypeSchema,
  notes: NotesSchema,
}).describe('Var')

export const VarUidSchema = VarSchema.pick({
  name: true,
})

export const VarsSchema = getArraySchema(VarSchema, parseVarUid)

export type Var = z.infer<typeof VarSchema>

export type VarUid = z.infer<typeof VarUidSchema>

export function parseVar($var: Var): Var {
  return VarSchema.parse($var)
}

export function parseVars($vars: Var[]): Var[] {
  return VarsSchema.parse($vars)
}

export function parseVarUid($varUid: VarUid): VarUid {
  return VarUidSchema.parse($varUid)
}

export const isEqualVar = isEqualByDC(parseVarUid)
