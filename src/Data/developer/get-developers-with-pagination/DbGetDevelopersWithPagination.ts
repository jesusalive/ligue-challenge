import { DeveloperModelWhereParam } from '@/Domain/developer/Developer'
import { GetAndCountAllDevelopersRepository } from '@/Domain/developer/repositories/GetAndCountAllDevelopersRepository'
import { GetDevelopersWithPagination, GetDevelopersWithPaginationReturn } from '@/Domain/developer/usecases/GetDevelopersWithPagination'

export class DbGetDevelopersWithPagination implements GetDevelopersWithPagination {
  constructor (
    private readonly getAndCountAllDevelopersRepository: GetAndCountAllDevelopersRepository
  ) {}

  async get (where: DeveloperModelWhereParam, page: number): Promise<GetDevelopersWithPaginationReturn> {
    const limit = 5
    const offset = (page - 1) * limit

    const repositoryResult = await this.getAndCountAllDevelopersRepository
      .getAndCountAll(where, limit, offset)

    return {
      developers: repositoryResult.developers,
      page,
      totalOfPages: Math.ceil(repositoryResult.total / 5)
    }
  }
}
