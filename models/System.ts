import { NotesSchema } from 'libs/generic/models/Notes'
import { isEqualByDC } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { last } from 'remeda'
import { z } from 'zod'
import { ensure } from '../../utils/ensure'
import { ArgSchema, isEqualArg } from './Arg'
import { FuncsSchema } from './Func'

export const SystemSchema = z.object({
  funcs: FuncsSchema,
  state: ArgSchema,
  notes: NotesSchema,
})
  .refine(({ funcs, state }) => {
    const isEqualToState = isEqualArg(state)
    return funcs.every(f => {
      const inputLast = ensure(last(f.inputs))
      return isEqualToState(inputLast) && isEqualToState(f.output)
    })
  })
  .describe('System')

export const SystemUidSchema = SystemSchema

export const SystemsSchema = getArraySchema(SystemSchema, parseSystemUid)

export type System = z.infer<typeof SystemSchema>

export type SystemUid = z.infer<typeof SystemUidSchema>

export function parseSystem(system: System): System {
  return SystemSchema.parse(system)
}

export function parseSystems(systems: System[]): System[] {
  return SystemsSchema.parse(systems)
}

export function parseSystemUid(systemUid: SystemUid): SystemUid {
  return SystemUidSchema.parse(systemUid)
}

export const isEqualSystem = isEqualByDC(parseSystemUid)
