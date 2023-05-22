import { z } from 'zod'

// facts are axioms (individual sensual experiences)
export const NaturalPhraseTypeSchema = z.enum(['axiom', 'theorem'])

export type NaturalPhraseType = z.infer<typeof NaturalPhraseTypeSchema>

export interface NaturalPhrase {
  type: NaturalPhraseType
  title: string
  children: NaturalPhrase[]
  isCorrect: boolean
}

export const NaturalPhraseSchema: z.ZodSchema<NaturalPhrase> = z.lazy(() => z.object({
  type: NaturalPhraseTypeSchema,
  title: z.string().min(1),
  children: z.array(NaturalPhraseSchema),
  isCorrect: z.boolean(),
}))

export function getPhraseUid(phrase: NaturalPhrase) {
  return JSON.stringify([phrase.title])
}

export function validatePhrase(phrase: NaturalPhrase) {
  return NaturalPhraseSchema.parse(phrase)
}

export function axiom(title: string) {
  return validatePhrase({ type: 'axiom', title, children: [], isCorrect: true })
}

export function theorem(title: string, children: NaturalPhrase[] = []) {
  if (!children.length) throw new Error('A theorem requires at least 1 child phrase')
  return validatePhrase({ type: 'theorem', title, children, isCorrect: children.every(child => child.isCorrect) })
}
