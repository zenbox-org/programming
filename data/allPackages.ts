import { getFinder, getInserter } from 'libs/utils/zod'
import { getPackageUid, Package, PackageSchema } from '../models/Package'
import { Haskell, Rust } from './allLanguages'
import { FormalVerification, Testing } from './allPackageTags'

export const allPackages: Package[] = []

export const addPackage = getInserter('Package', PackageSchema, getPackageUid, allPackages)

export const findPackage = getFinder(getPackageUid, allPackages)

export const smallcheck = addPackage({
  url: 'https://github.com/Bodigrim/smallcheck',
  language: Haskell,
  tags: [Testing],
})

export const quickcheck = addPackage({
  url: 'https://github.com/nick8325/quickcheck',
  language: Haskell,
  tags: [Testing],
})

// https://github.com/newca12/awesome-rust-formalized-reasoning

export const prusti = addPackage({
  url: 'https://github.com/viperproject/prusti-dev',
  language: Rust,
  tags: [FormalVerification],
})
