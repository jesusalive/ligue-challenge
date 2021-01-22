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

    test('Should return a created developer on success', async () => {
      const sut = makeSut()

      const fakeParams = makeCreateParams()
      const developer = await sut.create(fakeParams)

      expect(developer).toEqual(
        expect.objectContaining({
          name: fakeParams.name,
          sex: fakeParams.sex
        })
      )
    })
  })

  describe('update', () => {
    test('Should call update with correct values', async () => {
      const sut = makeSut()

      const updateSpy = jest.spyOn(Developer, 'update')
      await sut.update(1, {
        name: 'any_other_name'
      })

      expect(updateSpy).toHaveBeenCalledWith(
        {
          name: 'any_other_name'
        },
        {
          where: {
            id: 1
          }
        }
      )
    })

    test('Should return a updated developer on success', async () => {
      const developer = await Developer.create({
        age: 10,
        birthdate: new Date(),
        hobby: 'any_hobby',
        name: 'any_name',
        sex: 'H'
      })
      const sut = makeSut()

      const updatedDeveloper = await sut.update(developer.id, {
        name: 'any_other_name'
      })

      expect(updatedDeveloper).toEqual(
        expect.objectContaining({
          id: developer.id,
          name: 'any_other_name'
        })
      )
    })

    test('Should return null if not found', async () => {
      const sut = makeSut()

      const updatedDeveloper = await sut.update(1, {
        name: 'any_other_name'
      })

      expect(updatedDeveloper).toBeNull()
    })
  })

  describe('deleteById', () => {
    test('Should call destroy with correct values', async () => {
      const developer = await Developer.create({
        age: 10,
        birthdate: new Date(),
        hobby: 'any_hobby',
        name: 'any_name',
        sex: 'H'
      })
      const sut = makeSut()

      const destroySpy = jest.spyOn(Developer, 'destroy')

      await sut.deleteById(developer.id)

      expect(destroySpy).toHaveBeenCalledWith({
        where: {
          id: developer.id
        }
      })
    })

    test('Should return 1 and remove record on success', async () => {
      const developer = await Developer.create({
        age: 10,
        birthdate: new Date(),
        hobby: 'any_hobby',
        name: 'any_name',
        sex: 'H'
      })
      const sut = makeSut()

      const quantityOfRemovedRecords = await sut.deleteById(developer.id)
      const removedDeveloper = await Developer.findOne({
        where: {
          id: developer.id
        }
      })

      expect(quantityOfRemovedRecords).toBe(1)
      expect(removedDeveloper).toBeFalsy()
    })

    test('Should return 0 if developer not found', async () => {
      const sut = makeSut()

      const quantityOfRemovedRecords = await sut.deleteById(1)

      expect(quantityOfRemovedRecords).toBe(0)
    })
  })

  describe('getAll', () => {
    test('Should call findAll once time', async () => {
      const sut = makeSut()

      const findAllSpy = jest.spyOn(Developer, 'findAll')

      await sut.getAll()

      expect(findAllSpy).toHaveBeenCalledTimes(1)
    })

    test('Should return all developers on success', async () => {
      const fisrtDeveloper = await Developer.create({
        age: 10,
        birthdate: new Date(),
        hobby: 'any_hobby',
        name: 'any_name',
        sex: 'H'
      })
      const secondDeveloper = await Developer.create({
        age: 10,
        birthdate: new Date(),
        hobby: 'any_hobby',
        name: 'any_name',
        sex: 'H'
      })
      const sut = makeSut()

      const developers = await sut.getAll()

      expect(developers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: fisrtDeveloper.id
          }),
          expect.objectContaining({
            id: secondDeveloper.id
          })
        ])
      )
    })

    test('Should return a empty array if nothing found', async () => {
      const sut = makeSut()

      const developers = await sut.getAll()

      expect(developers).toEqual([])
    })
  })

  describe('getAndCountAll', () => {
    test('Should call findAndCountAll with correct values', async () => {
      const sut = makeSut()

      const findAndCountAllSpy = jest.spyOn(Developer, 'findAndCountAll')
      await sut.getAndCountAll({ name: 'any_name' }, 1, 2)

      expect(findAndCountAllSpy).toHaveBeenCalledWith({
        where: {
          name: 'any_name'
        },
        limit: 1,
        offset: 2
      })
    })

    test('Should return two developers and total 2', async () => {
      const fisrtDeveloper = await Developer.create({
        age: 10,
        birthdate: new Date(),
        hobby: 'any_hobby',
        name: 'any_name',
        sex: 'H'
      })
      const secondDeveloper = await Developer.create({
        age: 10,
        birthdate: new Date(),
        hobby: 'any_hobby',
        name: 'any_name',
        sex: 'H'
      })
      const sut = makeSut()

      const searchResult = await sut.getAndCountAll({ name: 'any_name' })

      expect(searchResult).toEqual({
        developers: expect.arrayContaining([
          expect.objectContaining({
            id: fisrtDeveloper.id
          }),
          expect.objectContaining({
            id: secondDeveloper.id
          })
        ]),
        total: 2
      })
    })

    test('Should return only the second developer and total 2', async () => {
      await Developer.create({
        age: 10,
        birthdate: new Date(),
        hobby: 'any_hobby',
        name: 'any_name',
        sex: 'H'
      })
      const secondDeveloper = await Developer.create({
        age: 10,
        birthdate: new Date(),
        hobby: 'any_hobby',
        name: 'any_name',
        sex: 'H'
      })
      const sut = makeSut()

      const searchResult = await sut.getAndCountAll({ name: 'any_name' }, 1, 1)

      expect(searchResult.developers.length).toBe(1)
      expect(searchResult.total).toBe(2)
      expect(searchResult).toEqual({
        developers: expect.arrayContaining([
          expect.objectContaining({
            id: secondDeveloper.id
          })
        ]),
        total: 2
      })
    })

    test('Should return only the first developer and total 1', async () => {
      const fisrtDeveloper = await Developer.create({
        age: 10,
        birthdate: new Date(),
        hobby: 'specific_hobby',
        name: 'any_name',
        sex: 'H'
      })
      await Developer.create({
        age: 10,
        birthdate: new Date(),
        hobby: 'any_hobby',
        name: 'any_name',
        sex: 'H'
      })
      const sut = makeSut()

      const searchResult = await sut.getAndCountAll({ hobby: 'specific_hobby' })

      expect(searchResult.developers.length).toBe(1)
      expect(searchResult.total).toBe(1)
      expect(searchResult).toEqual({
        developers: expect.arrayContaining([
          expect.objectContaining({
            id: fisrtDeveloper.id
          })
        ]),
        total: 1
      })
    })
  })

  describe('getById', () => {
    test('Should call findOne with correct values', async () => {
      const sut = makeSut()

      const findOneSpy = jest.spyOn(Developer, 'findOne')
      await sut.getById(1)

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 1
        }
      })
    })

    test('Should return a developer on success', async () => {
      const createdDeveloper = await Developer.create({
        age: 10,
        birthdate: new Date(),
        hobby: 'any_hobby',
        name: 'any_name',
        sex: 'H'
      })
      const sut = makeSut()

      const developer = await sut.getById(createdDeveloper.id)

      expect(developer).toEqual(
        expect.objectContaining({
          id: createdDeveloper.id
        })
      )
    })
  })
})
