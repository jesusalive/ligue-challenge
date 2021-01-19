import { CreateDeveloperController } from '@/Application/controllers/developer/create-developer/CreateDeveloperController'
import { Controller } from '@/Application/protocols'
import { DbAddDeveloper } from '@/Data/developer/add-developer/DbAddDeveloper'
import { DeveloperSequelizeRepository } from '@/Infrastructure/db/sequelize/developer/DeveloperSequelizeRepository'
import { makeCreateDeveloperValidation } from './create-developer-validation-factory'

export const makeCreateDeveloperController = (): Controller => {
  const developerSequelizeRepository = new DeveloperSequelizeRepository()
  const dbAddDeveloper = new DbAddDeveloper(developerSequelizeRepository)

  return new CreateDeveloperController(makeCreateDeveloperValidation(), dbAddDeveloper)
}
