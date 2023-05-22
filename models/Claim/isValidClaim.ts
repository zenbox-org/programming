import { isValidRequirement } from '../Requirement/isValidRequirement'
import { Claim } from './index'

export const isValidClaim = <T>(history: T[]) => ({ premises, conclusion }: Claim<T>) => {
  const isValid = isValidRequirement(history)
  return !premises.every(isValid) || isValid(conclusion)
}
