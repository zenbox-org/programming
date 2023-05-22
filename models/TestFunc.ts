import { z } from 'zod'
import { Id } from '../../generic/models/Id'

// TestFunc is a function from any type to a list of errors

export const TestFuncSchema = z.function().args(z.any())

export type TestFunc = z.infer<typeof TestFuncSchema>

export function validateTestFunc(func: TestFunc) {
  return TestFuncSchema.parse(func)
}

export function getTestFuncUid(func: TestFunc): Id {
  return func.name
}
