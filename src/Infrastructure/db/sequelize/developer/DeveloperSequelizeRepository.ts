import { DeveloperModel, DeveloperModelWhereParam } from '@/Domain/developer/Developer'
import { CreateDeveloperRepository } from '@/Domain/developer/repositories/CreateDeveloperRepository'
import { DeleteDeveloperByIdRepository } from '@/Domain/developer/repositories/DeleteDeveloperByIdRepository'
import { GetAllDevelopersRepository } from '@/Domain/developer/repositories/GetAllDevelopersRepository'
import { GetAndCountAllDevelopersRepository, GetAndCountAllDevelopersReturn } from '@/Domain/developer/repositories/GetAndCountAllDevelopersRepository'
import { GetDeveloperByIdRepository } from '@/Domain/developer/repositories/GetDeveloperByIdRepository'
import { UpdateDeveloperRepository } from '@/Domain/developer/repositories/UpdateDeveloperRepository'
import { UpdateDeveloperData } from '@/Domain/developer/usecases/UpdateDeveloper'
import Developer from './Developer.sequelize'

export class DeveloperSequelizeRepository implements
  CreateDeveloperRepository,
  UpdateDeveloperRepository,
  DeleteDeveloperByIdRepository,
  GetAllDevelopersRepository,
  GetDeveloperByIdRepository,
  GetAndCountAllDevelopersRepository {
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

  async deleteById (id: number): Promise<number> {
    const quantityOfRemovedRecords = await Developer.destroy({
      where: {
        id
      }
    })

    return quantityOfRemovedRecords
  }

  async getById (id: number): Promise<DeveloperModel> {
    const developer = await Developer.findOne({
      where: {
        id
      }
    })

    return developer
  }

  async getAll (): Promise<DeveloperModel[]> {
    const developers = await Developer.findAll()
    return developers
  }

  async getAndCountAll (
    where?: DeveloperModelWhereParam,
    limit?: number,
    offset?: number
  ): Promise<GetAndCountAllDevelopersReturn> {
    const searchResult = await Developer.findAndCountAll({
      where,
      limit,
      offset
    })

    return {
      developers: searchResult.rows,
      total: searchResult.count
    }
  }
}
