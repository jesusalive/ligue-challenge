import { DeveloperModel } from '@/Domain/developer/Developer'
import { GetDeveloperByIdRepository } from '@/Domain/developer/repositories/GetDeveloperByIdRepository'
import { GetOneDeveloper } from '@/Domain/developer/usecases/GetOneDeveloper'
import { NotFoundError } from '@/Domain/shared/errors/NotFoundError'

export class DbGetOneDeveloper implements GetOneDeveloper {
  constructor (
    private readonly getDeveloperByIdRepository: GetDeveloperByIdRepository
  ) {}

  async get (id: string|number): Promise<DeveloperModel> {
    const developer = await this.getDeveloperByIdRepository.getById(id)
    if (developer === null) throw new NotFoundError('Developer not found')

    return developer
  }
}
