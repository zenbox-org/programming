import { expect, test } from '@jest/globals'
import { init, Nat, next } from './nat'
import { getTermSize, matches, term, Term } from './prover'

const zero = term(init, [])
const one: Term = term(next, [zero])
const two: Term = term(next, [one])
const three: Term = term(next, [two])

const two_incorrect: Term = term(init, [one])

test('matches', () => {
  expect(matches(Nat)(two)).toBeTruthy()
  expect(matches(Nat)(two_incorrect)).toBeFalsy()
})

test('getTermSize', () => {
  expect(getTermSize(zero)).toEqual(1n)
  expect(getTermSize(two)).toEqual(24n)
  expect(getTermSize(three)).toBeGreaterThan(getTermSize(two))
  // TODO
  // const add_two_one = term(add, [two, one])
  // const add_one_two = term(add, [one, two])
  // expect(getTermSize(add_two_one)).toBeGreaterThan(getTermSize(add_one_two))
})

// test(reduce.name, () => {
//   expect(reduce(add)([one, two])).toEqual(three)
// })
