import { todo } from 'libs/utils/todo'
import { z } from 'zod'
import { FuncSchema } from './Func'

export const CallSchema = z.object({
  func: FuncSchema,
  arguments: todo(z.array(z.string())),
})

export type Call = z.infer<typeof CallSchema>

export function getCallUid(call: Call) {
  return JSON.stringify([call.func.name, call.arguments])
}
