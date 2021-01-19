import { Sequelize } from 'sequelize'
import cls from 'cls-hooked'

Sequelize.useCLS(cls.createNamespace('test-connection'))

const sequelize = new Sequelize('tests_ligue', 'root', 'tests_ligue', {
  host: '0.0.0.0',
  dialect: 'mysql',
  port: 3316,
  query: {
    raw: true
  }
})

export default sequelize
