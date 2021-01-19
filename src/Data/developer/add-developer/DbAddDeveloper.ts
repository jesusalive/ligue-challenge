import { DeveloperModel } from '@/Domain/developer/Developer'
import { CreateDeveloperRepository } from '@/Domain/developer/repositories/CreateDeveloperRepository'
import { AddDeveloper } from '@/Domain/developer/usecases/AddDeveloper'

export class DbAddDeveloper implements AddDeveloper {
  constructor (
    private readonly createDeveloperRepository: CreateDeveloperRepository
  ) {}

  async add (data: Omit<DeveloperModel, 'id'>): Promise<DeveloperModel> {
    await this.createDeveloperRepository.create(data)
    return null
  }
}
