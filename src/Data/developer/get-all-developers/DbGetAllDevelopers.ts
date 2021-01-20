import { DeveloperModel } from '@/Domain/developer/Developer'
import { GetAllDevelopersRepository } from '@/Domain/developer/repositories/GetAllDevelopersRepository'
import { GetAllDevelopers } from '@/Domain/developer/usecases/GetAllDevelopers'

export class DbGetAllDevelopers implements GetAllDevelopers {
  constructor (
    private readonly getAllDevelopersRepository: GetAllDevelopersRepository
  ) {}

  async getAll (): Promise<DeveloperModel[]> {
    const developers = await this.getAllDevelopersRepository.getAll()
    return developers
  }
}
