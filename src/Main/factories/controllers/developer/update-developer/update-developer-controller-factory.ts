import { UpdateDeveloperController } from '@/Application/controllers/developer/update-developer/UpdateDeveloperController'
import { Controller } from '@/Application/protocols'
import { DbUpdateDeveloper } from '@/Data/developer/update-developer/DbUpdateDeveloper'
import { DeveloperSequelizeRepository } from '@/Infrastructure/db/sequelize/developer/DeveloperSequelizeRepository'
import { makeUpdateDeveloperValidation } from './update-developer-validation-factory'

export const makeUpdateDeveloperController = (): Controller => {
  const developerSequelizeRepository = new DeveloperSequelizeRepository()
  const dbUpdateDeveloper = new DbUpdateDeveloper(developerSequelizeRepository)

  return new UpdateDeveloperController(makeUpdateDeveloperValidation(), dbUpdateDeveloper)
}
