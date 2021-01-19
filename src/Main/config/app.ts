import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

import 'reflect-metadata'

const app = express()
setupMiddlewares(app)
setupRoutes(app)

export default app
