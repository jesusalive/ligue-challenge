import { makeGetDevelopersWithPaginationController } from '@/Main/factories/controllers/developer/get-developers-pagination/get-developers-with-pagination-controller-factory'
import { makeGetAllDevelopersController } from '@/Main/factories/controllers/developer/get-all-developers/get-all-developers-controller-factory'
import { makeCreateDeveloperController } from '@/Main/factories/controllers/developer/create-developer/create-developer-controller-factory'
import { makeUpdateDeveloperController } from '@/Main/factories/controllers/developer/update-developer/update-developer-controller-factory'
import { makeRemoveDeveloperController } from '@/Main/factories/controllers/developer/remove-developer/remove-developer-controller-factory'
import { adaptRoute } from '@/Main/adapters/express/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/developers', adaptRoute(makeGetAllDevelopersController()))
  router.get('/developers/:page', adaptRoute(makeGetDevelopersWithPaginationController()))
  router.post('/developers', adaptRoute(makeCreateDeveloperController()))
  router.put('/developers/:id', adaptRoute(makeUpdateDeveloperController()))
  router.delete('/developers/:id', adaptRoute(makeRemoveDeveloperController()))
}
