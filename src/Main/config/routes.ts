import { Express, Router } from 'express'
import fs from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use(router)

  fs.readdirSync(`${__dirname}/../routes`).map(folder => {
    fs.readdirSync(`${__dirname}/../routes/${folder}`).map(async file => {
      if (!file.includes('.test.')) {
        (await import(`../routes/${folder}/${file}`)).default(router)
      }
    })
  })
}
