import { ensure } from 'libs/utils/ensure'
import { impl } from 'libs/utils/todo'
import { isBoolean, isEqual, isNumber } from 'lodash-es'
import { z } from 'zod'
import { Id } from '../../generic/models/Id'

export const ComputationSchema = z.object({
  name: z.string(),
  input: z.string(),
  output: z.string(),
})

export type Computation = z.infer<typeof ComputationSchema>

export interface UnknownComputation {
  name: string
  input: unknown
  output: unknown
}

export function getComputationUid(result: Computation): Id {
  return JSON.stringify(result)
}

export function getComputationOutput(results: Computation[], name: string, uids: Array<Id>) {
  const input = JSON.stringify(uids)
  const result = results.find(r => r.name === name && r.input === input)
  return result ? JSON.parse(result.output) : undefined
}

export function getComputationConverter<T>(typeName: string, typePredicate: (value: unknown) => value is T) {
  return function (results: Computation[], name: string, uids: Array<Id>): T {
    const output = getComputationOutput(results, name, uids)
    if (output === undefined) {
      throw new Error(`Computation does not exist (name: ${name}, input: ${JSON.stringify(uids)})`)
    }
    if (!typePredicate(output)) {
      throw new Error(`Computation does not have the required type "${typeName}" (name: ${name}, input: ${JSON.stringify(uids)})`)
    }
    return output
  }
}

export const getBooleanComputationOutput = getComputationConverter('boolean', isBoolean)

export const getNumberComputationOutput = getComputationConverter('number', isNumber)

function getManualValue<Input, Output>(results: Array<[Input, Output]>, input: Input) {
  const result = results.find(result => isEqual(result[0], input))
  return result ? result[1] : undefined
}

type Results<Input, Output> = Array<[Input, Output]>

type Converter<Input, InputIntermediate> = (value: Input) => InputIntermediate

function getManualValueWithConverter<Input, Output, InputIntermediate>(converter: Converter<Input, InputIntermediate>, results: Results<Input, Output>, input: Input) {
  const $input = converter(input)
  const $results = results.map(([input, output]): [InputIntermediate, Output] => [converter(input), output])
  return getManualValue($results, $input)
}

export function ensureManualValue<Input, Output, InputIntermediate>(results: Results<Input, Output>, input: Input) {
  return ensure(getManualValue(results, input), impl())
}

export function ensureManualValueWithConverter<Input, Output, InputIntermediate>(converter: Converter<Input, InputIntermediate>, results: Results<Input, Output>, input: Input) {
  return ensure(getManualValueWithConverter(converter, results, input), impl())
}
