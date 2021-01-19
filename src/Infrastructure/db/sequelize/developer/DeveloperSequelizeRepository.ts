import { DeveloperModel } from '@/Domain/developer/Developer'
import { CreateDeveloperRepository } from '@/Domain/developer/repositories/CreateDeveloperRepository'
import { UpdateDeveloperRepository } from '@/Domain/developer/repositories/UpdateDeveloperRepository'
import { UpdateDeveloperData } from '@/Domain/developer/usecases/UpdateDeveloper'
import Developer from './Developer.sequelize'

export class DeveloperSequelizeRepository implements CreateDeveloperRepository, UpdateDeveloperRepository {
  async create (data: Omit<DeveloperModel, 'id'>): Promise<DeveloperModel> {
    const developer = await Developer.create(data)
    return developer
  }

  async update (id: string|number, data: UpdateDeveloperData): Promise<DeveloperModel> {
    await Developer.update(data, {
      where: {
        id
      }
    })

    const updatedDeveloper = await Developer.findOne({
      where: {
        id
      }
    })
    return updatedDeveloper
  }
}
