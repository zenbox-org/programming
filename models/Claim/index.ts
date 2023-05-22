import { Requirement } from '../Requirement'

export interface Claim<T> {
  premises: Requirement<T>[]
  conclusion: Requirement<T>
}
