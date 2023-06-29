import { getDuplicatesRefinement } from 'libs/utils/zod'
import { Optional } from 'ts-toolbelt/out/Object/Optional'
import { z } from 'zod'
import { NotesSchema } from '../../generic/models/Notes'
import { Url, UrlSchema } from '../../generic/models/Url'

export interface Language {
  url: Url
  hasHygienicMacros: boolean | null
  hasGoodIDESupport?: boolean
  hasGarbageCollector?: boolean
  isMemorySafe: boolean
  notes?: string
  transpiledTo: Language[]
}

export type LanguageOptional = Optional<Language, 'transpiledTo'>

export const LanguageSchema: z.ZodSchema<Language> = z.lazy(() => z.object({
  url: UrlSchema,
  hasHygienicMacros: z.boolean().nullable(),
  hasGoodIDESupport: z.boolean().optional(),
  hasGarbageCollector: z.boolean().optional(),
  isMemorySafe: z.boolean(),
  notes: NotesSchema,
  transpiledTo: LanguagesSchema,
}))

export const LanguagesSchema = z.array(LanguageSchema)
  .superRefine(getDuplicatesRefinement('Language', getLanguageUid))

export const LanguageUidSchema = z.object({
  url: UrlSchema,
})

export type LanguageUid = z.infer<typeof LanguageUidSchema>

export function validateLanguage(language: Language): Language {
  return LanguageSchema.parse(language)
}

export function validateLanguages(languages: Language[]): Language[] {
  return LanguagesSchema.parse(languages)
}

export function getLanguageUid(languageUid: LanguageUid) {
  return LanguageUidSchema.parse(languageUid)
}
