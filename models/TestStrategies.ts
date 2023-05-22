import { getInserter } from 'libs/utils/zod'
import { getTestStrategyUid, TestStrategy, TestStrategySchema } from './TestStrategy'

export const allTestStrategies: TestStrategy[] = []

export const addTestStrategy = getInserter('TestStrategy', TestStrategySchema, getTestStrategyUid, allTestStrategies)

export const ManualTestStrategy = addTestStrategy({
  name: 'Manual',
  isComplete: false,
  allowsFullSpecification: false,
  allowsToMinimizeTimeToNonzeroProbabilityOfSuccess: true,
  isAssertionCheckingAutomated: false,
  inputGenerationStrategy: 'FromHuman',
  inputMinimizationStrategy: 'Manual',
})

export const UnitTestStrategy = addTestStrategy({
  name: 'Unit',
  isComplete: false,
  allowsFullSpecification: false,
  allowsToMinimizeTimeToNonzeroProbabilityOfSuccess: true,
  isAssertionCheckingAutomated: true,
  inputGenerationStrategy: 'FromHuman',
  inputMinimizationStrategy: 'Manual',
})

export const TheoremTestStrategy = addTestStrategy({
  name: 'Theorem',
  isComplete: true,
  allowsFullSpecification: true,
  allowsToMinimizeTimeToNonzeroProbabilityOfSuccess: true, // can axiomatize some theorems
  isAssertionCheckingAutomated: true,
  inputGenerationStrategy: 'None',
  inputMinimizationStrategy: 'Noop',
})

export const SemiautomaticTestStrategy = addTestStrategy({
  name: 'Semiautomatic',
  description: `
    * Implement an exhaustive model of user interaction
    * Implement an interactive runReal method:
      * Ask the user to execute the action (manually write to a state)
      * Ask the user to record the results (manually read from a state)
    * Gradually automate the reads & writes
  `,
  isComplete: false,
  allowsFullSpecification: true,
  allowsToMinimizeTimeToNonzeroProbabilityOfSuccess: true,
  isAssertionCheckingAutomated: true,
  inputGenerationStrategy: 'FromHuman',
  inputMinimizationStrategy: 'Manual',
})

export const FuzzingTestStrategy = addTestStrategy({
  name: 'Fuzzing',
  description: '',
  isComplete: false,
  allowsFullSpecification: false,
  allowsToMinimizeTimeToNonzeroProbabilityOfSuccess: true,
  isAssertionCheckingAutomated: true,
  inputGenerationStrategy: 'FromProgram',
  inputMinimizationStrategy: 'Automatic',
})
