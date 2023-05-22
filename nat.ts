import { Func, term, Term, Type } from './prover'

export const Nat: Type = {
  name: 'Nat',
  types: [],
  constructors: () => [
    init,
    next,
  ],
}

export const init: Func = {
  name: 'init',
  types: [],
  constructors: () => [],
}

export const next: Func = {
  name: 'next',
  types: [Nat],
  constructors: () => [],
}

const ensureLength = (length: number) => <T>(array: T[]) => {
  if (array.length !== length) throw new Error()
  return array
}

export const add: Func = {
  name: 'add',
  types: [Nat, Nat],
  body: function addRaw(terms: Term[]): Term {
    const [a, b] = ensureLength(2)(terms)
    switch (a.func) {
      case init: return b
      case next: return term(add, [a.args[0], term(next, [b])])
      default: throw new Error()
    }
  },
  constructors: () => [],
}
