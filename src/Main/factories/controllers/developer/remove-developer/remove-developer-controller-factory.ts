import { RemoveDeveloperController } from '@/Application/controllers/developer/remove-developer/RemoveDeveloperController'
import { Controller } from '@/Application/protocols'
import { DbRemoveDeveloper } from '@/Data/developer/remove-developer/DbRemoveDeveloper'
import { DeveloperSequelizeRepository } from '@/Infrastructure/db/sequelize/developer/DeveloperSequelizeRepository'

export const makeRemoveDeveloperController = (): Controller => {
  const developerSequelizeRepository = new DeveloperSequelizeRepository()
  const dbRemoveDeveloper = new DbRemoveDeveloper(developerSequelizeRepository)

  return new RemoveDeveloperController(dbRemoveDeveloper)
}
