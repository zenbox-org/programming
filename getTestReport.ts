export function getTestReport(tests: string[], passes: string[]) {
  const results = tests.map(test => `${passes.includes(test) ? '✓' : '×'} ${test}`)
  const isPassing = !results.find(result => result.startsWith('×'))
  return { results, isPassing }
}
