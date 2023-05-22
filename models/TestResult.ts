import { z } from 'zod'
import { RepositorySchema } from './Repository'

export const TestResultSchema = z.object({
  repository: RepositorySchema,
  name: z.string().min(1),
  isPassing: z.boolean().default(false),
})

export type TestResult = z.infer<typeof TestResultSchema>
