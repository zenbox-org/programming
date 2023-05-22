import { isEqualByDC } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { ValSchema } from './Val'
import { VarSchema } from './Var'

export const ArgSchema = VarSchema.extend({
  default: ValSchema.optional(),
}).describe('Arg')

export const ArgUidSchema = ArgSchema.pick({

})

export const ArgsSchema = getArraySchema(ArgSchema, parseArgUid)

export type Arg = z.infer<typeof ArgSchema>

export type ArgUid = z.infer<typeof ArgUidSchema>

export function parseArg(arg: Arg): Arg {
  return ArgSchema.parse(arg)
}

export function parseArgs(args: Arg[]): Arg[] {
  return ArgsSchema.parse(args)
}

export function parseArgUid(argUid: ArgUid): ArgUid {
  return ArgUidSchema.parse(argUid)
}

export const isEqualArg = isEqualByDC(parseArgUid)
