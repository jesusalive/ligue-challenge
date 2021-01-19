import { DeveloperModel } from '@/Domain/developer/Developer'
import Developer, { fields, defaultOptions } from './Developer.sequelize'
import { DeveloperSequelizeRepository } from './DeveloperSequelizeRepository'
import testConnection from '@/Infrastructure/db/sequelize/test-connection-instance'

const makeCreateParams = (): Omit<DeveloperModel, 'id'> => ({
  age: 1,
  birthdate: new Date('01-01-2020'),
  hobby: 'any_hobby',
  name: 'any_name',
  sex: 'H'
})

const makeSut = (): DeveloperSequelizeRepository => new DeveloperSequelizeRepository()

describe('DeveloperSequelizeRepository', () => {
  beforeAll(async () => {
    Developer.init(fields, { sequelize: testConnection, ...defaultOptions })
    await testConnection.sync()
  })

  afterEach(async () => {
    await Developer.truncate()
  })

  afterAll(async () => {
    await testConnection.close()
  })

  describe('create', () => {
    test('Should call create with correct values', async () => {
      const sut = makeSut()

      const createSpy = jest.spyOn(Developer, 'create')
      await sut.create(makeCreateParams())

      expect(createSpy).toHaveBeenCalledWith(makeCreateParams())
    })
  })
})
