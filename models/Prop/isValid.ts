import { uniqBy } from 'remeda'
import { Filter } from '../../../utils/Filter'
import { Comparator } from '../../../utils/comparator'
import { isEqualByDC } from '../../../utils/lodash'
import { Mapper } from '../../../utils/Mapper'
import { over } from '../../../utils/remeda/over'
import { System } from '../System'

export const isValid = (system: System) => {
  // has all positive properties
  // does not have any negative properties
}

export interface Named<Value> {
  name: string
  value: Value
}

interface Typ<Value> {
  name: string
  corners: Value[] // special cases (e.g. zero, lowest, highest)
}

type Rec<Value> = Array<[string, Typ<Value>]>

type Arr<Value> = Typ<Value>[]

type GetHistory = <Action, State>(actions: Action[]) => (initial: State) => State[]

type GetHistoryRec = <Action, State>(input: { actions: Action[], initial: State }) => State[]

type InputOutputPair<Input, Output> = { input: Input, output: Output }

type GetInputOutputPair = <Input, Output>(mapper: Mapper<Input, Output>) => (input: Input) => InputOutputPair<Input, Output>

const getInputOutputPair: GetInputOutputPair = <Input, Output>(mapper: Mapper<Input, Output>) => (input: Input) => ({
  input,
  output: mapper(input),
})

const filtersAreCorrelated = <Value>(filters: Filter<Value>[]) => (value: Value) => filters.every(filter => filter(value))

export interface Extractor<Source, Value> {
  name: string
  type: Typ<Value>
  extract: (source: Source) => Value
}

export interface Converter<From, To> {
  name: string
  from: Typ<From>
  to: Typ<To>
  convert: Mapper<From, To>
}

const convert = <From, To>(converter: Converter<From, To>) => (value: From) => ({
  name: converter.name,
  type: converter.to,
  value: converter.convert(value),
})

export interface Comparer<Value> {
  name: string
  type: Typ<Value>
  compare: Comparator<Value>
}

export interface Val<Value> {
  name: string
  type: Typ<Value>
  value: Value
}

const getType = <V>(input: { type: Typ<V> }) => input.type

function getTypes<Source>(extractors: Extractor<Source, unknown>[]) {
  return uniqBy(extractors.map(e => e.type), type => type.name)
}

const getConvertersByTypes = (allConverters: Converter<unknown, unknown>[]) => (types: Typ<unknown>[]) => {
  const names = types.map(t => t.name)
  return allConverters.filter(c => names.includes(c.from.name) && names.includes(c.to.name))
}

const getConvertersFromTypeToTypes = (allConverters: Converter<unknown, unknown>[]) => (from: Typ<unknown>, to: Typ<unknown>[]) => {
  const toNames = to.map(t => t.name)
  return allConverters.filter(c => c.from.name === from.name && toNames.includes(c.to.name))
}

type BiMapper<In, Out> = (left: In, right: In) => Out

const getValsFromSource = (allConverters: Converter<unknown, unknown>[]) => <Source>(extractors: Extractor<Source, unknown>[]) => (source: Source) => {
  const types = getTypes(extractors)
  const converters = getConvertersByTypes(allConverters)(types)
  return extractors.flatMap(({ name, type, extract }) => {
    const value = extract(source)
    const val: Val<unknown> = { name, type, value }
    /**
     * TODO: chain converters?
     * - don't reapply the inverse connector
     * - don't reapply the same connector twice
     *
     * Move the generation of converters array outside of this function?
     */
    const converters = getConvertersFromTypeToTypes(allConverters)(type, types)
    const vals: Val<unknown>[] = converters.map(convert).map(over(value)).map(addNamePrefix(name))
    return vals.concat([val])
  })
}

const isEqualByType = isEqualByDC(getType)

const getComparisonsFromVals = <To>(allComparers: Comparer<unknown>[]) => (vals: Val<unknown>[]) => vals.map((left, leftIndex) => vals.map((right, rightIndex) => {
  if (leftIndex === rightIndex) return undefined
  if (!isEqualByType(left)(right)) return undefined
  const comparers = allComparers.filter(isEqualByType(left))
  return comparers
    .filter(({ compare }) => compare(left.value, right.value))
    .map(comparer => ({ comparer, left, right }))
}))

const getComparisonsFromSource = (allConverters: Converter<unknown, unknown>[], allComparers: Comparer<unknown>[]) => <Source>(extractors: Extractor<Source, unknown>[]) => (source: Source) => {
  const vals = getValsFromSource(allConverters)(extractors)(source)
  return getComparisonsFromVals(allComparers)(vals)
}

export const addNamePrefix = (prefix: string) => <Value>(named: Val<Value>) => ({
  ...named,
  name: getPrefixedName(prefix)(named.name),
})

export const getPrefixedName = (prefix: string) => (name: string) => `${prefix}.${name}`
