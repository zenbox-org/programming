import { impl } from 'libs/utils/todo'
import { ProgrammingProject } from './createProgrammingProject'
import { Func } from './models/Func'

export async function getChoiceFunction(project: ProgrammingProject): Promise<Func> {
  const typeName = await getTypeName(project)
  const functionName = `get${typeName}`
  throw impl(`
  * Solve all type-related problems
  * Defer solving implementation-related problems until all type-related problems have been solved
  `)
}

async function getTypeName(project: ProgrammingProject) {
  throw impl()
}
