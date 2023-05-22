import { z } from 'zod'
import { Id } from '../../generic/models/Id'

export const WordSchema = z.string()

export type Word = z.infer<typeof WordSchema>

export function validateWord(word: Word) {
  return WordSchema.parse(word)
}

export function getWordUid(word: Word): Id {
  return word
}
