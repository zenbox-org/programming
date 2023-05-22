import { z } from 'zod'
import { Id } from '../../generic/models/Id'
import { Word, WordSchema } from './Word'

export type Phrase = Array<Phrase | Word>

export const PhraseSchema: z.ZodSchema<Phrase> = z.lazy(() => {
  return z.array(z.union([PhraseSchema, WordSchema]))
})

export function validatePhrase(phrase: Phrase) {
  return PhraseSchema.parse(phrase)
}

export function getPhraseUid(phrase: Phrase): Id {
  return `(${phrase.join(' ')})`
}
