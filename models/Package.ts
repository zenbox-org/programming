import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { NotesSchema } from '../../generic/models/Notes'
import { UrlSchema } from '../../generic/models/Url'
import { LanguageSchema } from './Language'
import { PackageTagsSchema } from './PackageTag'

export const PackageSchema = z.object({
  url: UrlSchema,
  language: LanguageSchema,
  tags: PackageTagsSchema,
  notes: NotesSchema,
})

export const PackagesSchema = z.array(PackageSchema)
  .superRefine(getDuplicatesRefinement('Package', getPackageUid))

export const PackageUidSchema = PackageSchema.pick({
  url: true,
})

export type Package = z.infer<typeof PackageSchema>

export type PackageUid = z.infer<typeof PackageUidSchema>

export function validatePackage(pkg: Package): Package {
  return PackageSchema.parse(pkg)
}

export function validatePackages(pkgs: Package[]): Package[] {
  return PackagesSchema.parse(pkgs)
}

export function getPackageUid(packageUid: PackageUid) {
  return PackageUidSchema.parse(packageUid)
}
