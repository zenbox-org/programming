import { num } from 'libs/utils/BigNumber/utils'
import { ColiProject } from '../../projects/Coliquidity/getColiProject'
import { getBestOptionByBigNumber } from '../decimaker/models/Option.alternative'
import { allTestStrategies } from './models/TestStrategies'

export async function getTestStrategy(project: ColiProject) {
  return getBestOptionByBigNumber(
    allTestStrategies,
    async function (strategy) {
      if (!strategy.isAssertionCheckingAutomated) return undefined
      // if (!(strategy.inputGenerationStrategy === 'FromProgram')) return undefined
      if (!strategy.allowsFullSpecification) return undefined // can't specify the full system
      if (!strategy.allowsToMinimizeTimeToNonzeroProbabilityOfSuccess) return undefined
      if (strategy.isComplete) return undefined // too much time
      /**
       * TODO: Implement an estimator
       * - Minimize time
       * - Minimize damage from errors
       */
      return num(0)
    },
  )
}
