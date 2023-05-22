import { isEqualByD } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import * as $ from '../../../libs/tree/models/Node'

export const PackageTagSchema = $.NodeSchema.describe('PackageTag')

export const PackageTagUidSchema = $.NodeUidSchema

export const PackageTagsSchema = getArraySchema(PackageTagSchema, parsePackageTagUid)

export type PackageTag = z.infer<typeof PackageTagSchema>

export type PackageTagUid = z.infer<typeof PackageTagUidSchema>

export function parsePackageTag(tag: PackageTag): PackageTag {
  return PackageTagSchema.parse(tag)
}

export function parsePackageTags(tags: PackageTag[]): PackageTag[] {
  return PackageTagsSchema.parse(tags)
}

export function parsePackageTagUid(tagUid: PackageTagUid): PackageTagUid {
  return PackageTagUidSchema.parse(tagUid)
}

export const isEqualPackageTag = (a: PackageTag) => (b: PackageTag) => isEqualByD(a, b, parsePackageTagUid)
