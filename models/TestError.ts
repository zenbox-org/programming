import { z } from 'zod'
import { Id } from '../../generic/models/Id'

export const TestErrorSchema = z.object({
  uid: z.string(),
  location: z.string(),
})

export type TestError = z.infer<typeof TestErrorSchema>

export function validateTestError(error: TestError) {
  return TestErrorSchema.parse(error)
}

export function getTestErrorUid(error: TestError): Id {
  return error.uid
}
