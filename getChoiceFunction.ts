import { impl } from 'libs/utils/todo'
import { Func } from './models/Func'

export async function getChoiceFunction(): Promise<Func> {
  const typeName = await getTypeName()
  const functionName = `get${typeName}`
  throw impl(`
  * Solve all type-related problems
  * Defer solving implementation-related problems until all type-related problems have been solved
  `)
}

async function getTypeName() {
  throw impl()
}
