import { GetAllDevelopersController } from '@/Application/controllers/developer/get-all-developers/GetAllDevelopersController'
import { Controller } from '@/Application/protocols'
import { DbGetAllDevelopers } from '@/Data/developer/get-all-developers/DbGetAllDevelopers'
import { DeveloperSequelizeRepository } from '@/Infrastructure/db/sequelize/developer/DeveloperSequelizeRepository'

export const makeGetAllDevelopersController = (): Controller => {
  const developerSequelizeRepository = new DeveloperSequelizeRepository()
  const dbGetAllDevelopers = new DbGetAllDevelopers(developerSequelizeRepository)

  return new GetAllDevelopersController(dbGetAllDevelopers)
}
