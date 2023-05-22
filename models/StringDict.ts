import { z } from 'zod'
import { Id } from '../../generic/models/Id'

export const StringDictSchema = z.object({
  name: z.string(),
  values: z.record(z.string()),
})

export type StringDict = z.infer<typeof StringDictSchema>

export function validateDict(dict: StringDict) {
  return StringDictSchema.parse(dict)
}

export function getDictUid(dict: StringDict): Id {
  return dict.name
}
