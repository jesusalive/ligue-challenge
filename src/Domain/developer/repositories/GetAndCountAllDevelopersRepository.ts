import { DeveloperModel, DeveloperModelWhereParam } from '../Developer'

export interface GetAndCountAllDevelopersReturn {
  developers: DeveloperModel[]
  total: number
}

export interface GetAndCountAllDevelopersRepository {
  getAndCountAll: (
    where?: DeveloperModelWhereParam,
    limit?: number,
    offset?: number
  ) => Promise<GetAndCountAllDevelopersReturn>
}
