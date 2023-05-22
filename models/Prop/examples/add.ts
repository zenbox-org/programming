const add = (a: number, b: number) => a + b

export const addProps = [
  'b = 0 -> y = a',
  'a = 0 -> y = b',
  'a >= 0 && b >= 0 -> y >= a && y >= b',
  'a <= 0 && b <= 0 -> y >= a && y >= b',
]
