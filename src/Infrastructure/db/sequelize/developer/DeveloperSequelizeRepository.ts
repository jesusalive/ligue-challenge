import { DeveloperModel } from '@/Domain/developer/Developer'
import { CreateDeveloperRepository } from '@/Domain/developer/repositories/CreateDeveloperRepository'
import Developer from './Developer.sequelize'

export class DeveloperSequelizeRepository implements CreateDeveloperRepository {
  async create (data: Omit<DeveloperModel, 'id'>): Promise<DeveloperModel> {
    await Developer.create(data)
    return null
  }
}
