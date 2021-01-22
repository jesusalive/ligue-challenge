import { Controller } from '@/Application/protocols'
import { GetOneDeveloperController } from '@/Application/controllers/developer/get-one-developer/GetOneDeveloperController'
import { DbGetOneDeveloper } from '@/Data/developer/get-one-developer/DbGetOneDeveloper'
import { DeveloperSequelizeRepository } from '@/Infrastructure/db/sequelize/developer/DeveloperSequelizeRepository'

export const makeGetOneDeveloperController = (): Controller => {
  const developerSequelizeRepository = new DeveloperSequelizeRepository()
  const dbGetOneDeveloper = new DbGetOneDeveloper(developerSequelizeRepository)

  return new GetOneDeveloperController(dbGetOneDeveloper)
}
