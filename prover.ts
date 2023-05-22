import { todo } from '../utils/todo'

export interface Func {
  name: string
  types: Type[]
  body?: (terms: Term[]) => Term
  constructors: (terms: Term[]) => Func[]
}

export interface Type extends Func {
  name: string
}

export interface Term {
  func: Func
  args: Term[]
}

export const term = (func: Func, args: Term[]): Term => ({ func, args })

const isFinal = (term: Term) => !term.func.body

export const matches = (type: Type) => (term: Term): boolean => {
  const { func, args } = term
  if (!type.constructors([]).includes(func)) return false
  if (func.types.length !== args.length) return false
  return args.every((term, index) => matches(func.types[index])(term))
}

export const reduce = (term: Term): Term => {
  if (term.func.body) {
    let { func, args } = term
    if (func.types.length !== args.length) throw new Error(todo())
    let prevSize: bigint
    let nextSize = getTermSize(term)
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const termNew = term.func.body(args)
      if (isFinal(termNew)) return termNew
      func = termNew.func
      args = termNew.args
      prevSize = nextSize
      nextSize = getTermSize(term)
      if (nextSize >= prevSize) throw new Error('Unterminating function')
    }
  } else {
    return term
  }
}

/**
 * TODO: Fix the termination criteria
 */
export const getTermSizeRaw = (depth = 1n) => (term: Term): bigint => term.args.reduce((result, arg, index) => {
  return result * getTermSizeRaw(depth + 1n)(arg) * (2n ** BigInt(index + 1))
}, depth)

export const getTermSize = getTermSizeRaw(1n)
