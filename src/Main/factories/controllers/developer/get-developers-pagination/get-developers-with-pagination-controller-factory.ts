import { DbGetDevelopersWithPagination } from '@/Data/developer/get-developers-with-pagination/DbGetDevelopersWithPagination'
import { GetDevelopersWithPaginationController } from '@/Application/controllers/developer/get-developers-pagination/GetDevelopersWithPaginationController'
import { Controller } from '@/Application/protocols'
import { DeveloperSequelizeRepository } from '@/Infrastructure/db/sequelize/developer/DeveloperSequelizeRepository'

export const makeGetDevelopersWithPaginationController = (): Controller => {
  const developerSequelizeRepository = new DeveloperSequelizeRepository()
  const dbGetDevelopersWithPagination = new DbGetDevelopersWithPagination(developerSequelizeRepository)

  return new GetDevelopersWithPaginationController(dbGetDevelopersWithPagination)
}
