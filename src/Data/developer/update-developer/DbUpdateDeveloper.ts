import { DeveloperModel } from '@/Domain/developer/Developer'
import { UpdateDeveloperRepository } from '@/Domain/developer/repositories/UpdateDeveloperRepository'
import { UpdateDeveloper, UpdateDeveloperData } from '@/Domain/developer/usecases/UpdateDeveloper'
import { NotFoundError } from '@/Domain/shared/errors/NotFoundError'

export class DbUpdateDeveloper implements UpdateDeveloper {
  constructor (
    private readonly updateDeveloperRepository: UpdateDeveloperRepository
  ) {}

  async update (id: string|number, data: UpdateDeveloperData): Promise<DeveloperModel> {
    const updatedDeveloper = await this.updateDeveloperRepository.update(id, data)

    if (updatedDeveloper === null) throw new NotFoundError('Developer not found')

    return updatedDeveloper
  }
}
