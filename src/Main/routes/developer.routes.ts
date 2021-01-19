import { makeCreateDeveloperController } from '@/Main/factories/controllers/developer/create-developer/create-developer-controller-factory'
import { makeUpdateDeveloperController } from '@/Main/factories/controllers/developer/update-developer/update-developer-controller-factory'
import { adaptRoute } from '@/Main/adapters/express/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/developers', adaptRoute(makeCreateDeveloperController()))
  router.put('/developers/:id', adaptRoute(makeUpdateDeveloperController()))
}
