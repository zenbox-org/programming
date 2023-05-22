import { TypeName } from './TypeName'

export interface TypePath {
  from: TypeName
  to: TypeName
  exists: boolean
}

export type TypePathAsArray = [TypeName, TypeName, boolean]

export function path(from: TypeName, to: TypeName, exists: boolean): TypePath {
  return {
    from,
    to,
    exists,
  }
}

export function paths(pathsAsArray: TypePathAsArray[]) {
  return pathsAsArray.map(p => path(...p))
}
