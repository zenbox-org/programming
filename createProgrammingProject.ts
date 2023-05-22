import { Config, getDefaultConfig } from '../../models/Config'

export interface ProgrammingProject extends Config {

}

export function createProgrammingProject(): ProgrammingProject {
  return {
    executors: [],
    ...getDefaultConfig('Programming'),
  }
}
