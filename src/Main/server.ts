import sequelizeConnectionInstance from '@/Infrastructure/db/sequelize/connection-instance'
import app from './config/app'
import 'reflect-metadata'

sequelizeConnectionInstance.sync()
  .then(() => {
    app.listen(process.env.PORT, () => console.log('Server running on port: ' + process.env.PORT))
  })
  .catch(() => {
    console.log('Database sync error :(')
  })
