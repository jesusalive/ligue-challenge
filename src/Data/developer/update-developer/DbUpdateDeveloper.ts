import { DeveloperModel } from '@/Domain/developer/Developer'
import { UpdateDeveloperRepository } from '@/Domain/developer/repositories/UpdateDeveloperRepository'
import { UpdateDeveloper, UpdateDeveloperData } from '@/Domain/developer/usecases/UpdateDeveloper'

export class DbUpdateDeveloper implements UpdateDeveloper {
  constructor (
    private readonly updateDeveloperRepository: UpdateDeveloperRepository
  ) {}

  async update (id: string|number, data: UpdateDeveloperData): Promise<DeveloperModel> {
    await this.updateDeveloperRepository.update(id, data)
    return null
  }
}
