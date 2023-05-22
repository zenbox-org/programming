import { Requirement } from './index'

export const isValidRequirement = <T>(history: T[]) => ({ filter, length }: Requirement<T>) => {
  return (history.length >= length) ? filter(history.slice(-length)) : true
}
