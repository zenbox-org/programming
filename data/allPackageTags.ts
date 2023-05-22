import { getFinder, getInserter, getName } from 'libs/utils/zod'
import { PackageTag, PackageTagSchema, parsePackageTagUid } from '../models/PackageTag'

export const allPackageTags: PackageTag[] = []

export const addPackageTag = getInserter(getName(PackageTagSchema), PackageTagSchema, parsePackageTagUid, allPackageTags)

export const findPackageTag = getFinder(parsePackageTagUid, allPackageTags)

export const Testing = addPackageTag({
  name: 'Testing',
})

export const FormalVerification = addPackageTag({
  name: 'FormalVerification',
})
