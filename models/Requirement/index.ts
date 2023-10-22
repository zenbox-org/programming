import { State } from '../../../fairpool/formulas/models/State'
import { Filter } from '../../../utils/Filter'

export interface Requirement<T> {
  length: number // how long should the slice be
  filter: Filter<T[]>
}

export const req = <T>(length: number, filter: Filter<T[]>): Requirement<T> => ({ length, filter })

export interface RequirementStatic<H extends State[]> {
  length: H['length']; // how long should the slice be
  filter: Filter<H>;
}

export const reqStatic = <T extends State[]>(length: T['length'], filter: Filter<T>): RequirementStatic<T> => ({ length, filter })
