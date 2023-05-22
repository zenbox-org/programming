import { isEqualByDC } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'

import { z } from 'zod'
import { ArgSchema } from './Arg'
import { VarSchema } from './Var'

export const FuncSchema = VarSchema.extend({
  inputs: z.array(ArgSchema),
  output: ArgSchema,
}).describe('Func')

export const FuncUidSchema = VarSchema

export const FuncsSchema = getArraySchema(FuncSchema, parseFuncUid)

export type Func = z.infer<typeof FuncSchema>

export type FuncUid = z.infer<typeof FuncUidSchema>

export function parseFunc(func: Func): Func {
  return FuncSchema.parse(func)
}

export function parseFuncs(funcs: Func[]): Func[] {
  return FuncsSchema.parse(funcs)
}

export function parseFuncUid(funcUid: FuncUid): FuncUid {
  return FuncUidSchema.parse(funcUid)
}

export const isEqualFunc = isEqualByDC(parseFuncUid)
