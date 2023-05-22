import { z } from 'zod'

export const TestStrategySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  isComplete: z.boolean(), // verifies all cases (proves a theorem)
  allowsFullSpecification: z.boolean(), // e.g. allows to express the predicate systemGeneratesMoney
  allowsToMinimizeTimeToNonzeroProbabilityOfSuccess: z.boolean(), // allows using manual labor instead of automation / axioms / proofs
  isAssertionCheckingAutomated: z.boolean(),
  inputGenerationStrategy: z.enum([
    'None', // no need to generate the input (e.g. for formal verification)
    'FromHuman',
    'FromArbitraries',
    'FromProgram',
  ]),
  inputMinimizationStrategy: z.enum([
    'Noop', // generated inputs are already minimal
    'Manual',
    'Automatic',
  ]),
})

export type TestStrategy = z.infer<typeof TestStrategySchema>

export function getTestStrategyUid(testStrategy: TestStrategy) {
  return JSON.stringify([testStrategy.name])
}

export function validateTestStrategy(testStrategy: TestStrategy) {
  return TestStrategySchema.parse(testStrategy)
}
