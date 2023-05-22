import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { IdSchema } from '../../generic/models/Id'
import { UrlSchema } from '../../generic/models/Url'

export const RepositorySchema = z.object({
  id: IdSchema,
  url: UrlSchema,
})

export const RepositoriesSchema = z.array(RepositorySchema)
  .superRefine(getDuplicatesRefinement('Repository', parseRepositoryUid))
  .superRefine(getDuplicatesRefinement('Repository', (r) => r.url))

export const RepositoryUidSchema = RepositorySchema.pick({
  id: true,
})

export type Repository = z.infer<typeof RepositorySchema>

export type RepositoryUid = z.infer<typeof RepositoryUidSchema>

export function parseRepository(repository: Repository): Repository {
  return RepositorySchema.parse(repository)
}

export function parseRepositories(repositories: Repository[]): Repository[] {
  return RepositoriesSchema.parse(repositories)
}

export function parseRepositoryUid(repositoryUid: RepositoryUid): RepositoryUid {
  return RepositoryUidSchema.parse(repositoryUid)
}
