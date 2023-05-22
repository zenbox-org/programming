import { difference } from 'lodash-es'
import { Config } from '../../models/Config'
import { task } from '../../src/task'
import { TestResult } from './models/TestResult'

export async function developSoftwareProject(expectedTestNames: string, actualTestResults: TestResult[], project: Config) {
  const actualTestNames = actualTestResults.filter(r => r.isPassing).map(r => r.name)
  const diff = difference(expectedTestNames, actualTestNames)
  if (diff.length) throw task('Implement tests', '', { diff })
}
