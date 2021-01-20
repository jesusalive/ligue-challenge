import { DeveloperModel, DeveloperModelWhereParam } from '../Developer'

export interface GetDevelopersWithPaginationReturn {
  developers: DeveloperModel[]
  page: number
  totalOfPages: number
}

export interface GetDevelopersWithPagination {
  get: (where: DeveloperModelWhereParam, page: number) => Promise<GetDevelopersWithPaginationReturn>
}
