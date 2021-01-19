import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import cls from 'cls-hooked'

dotenv.config()

Sequelize.useCLS(cls.createNamespace('default-connection'))

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
  query: {
    raw: true
  }
})

export default sequelize
