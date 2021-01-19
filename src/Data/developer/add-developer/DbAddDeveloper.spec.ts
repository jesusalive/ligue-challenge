import { DeveloperModel } from '@/Domain/developer/Developer'
import { CreateDeveloperRepository } from '@/Domain/developer/repositories/CreateDeveloperRepository'
import { DbAddDeveloper } from './DbAddDeveloper'

const makeFakeParams = (): Omit<DeveloperModel, 'id'> => ({
  name: 'any_name',
  age: 10,
  sex: 'H',
  hobby: 'games',
  birthdate: new Date('01-01-2020')
})

const makeFakeDeveloper = (): DeveloperModel => ({
  id: 'any_id',
  age: 10,
  sex: 'H',
  hobby: 'games',
  name: 'any_name',
  birthdate: new Date('01-01-2020')
})

const makeCreateDeveloperRepositoryStub = (): CreateDeveloperRepository => {
  class CreateDeveloperRepositoryStub implements CreateDeveloperRepository {
    async create (): Promise<DeveloperModel> {
      return await new Promise(resolve => resolve(makeFakeDeveloper()))
    }
  }
  return new CreateDeveloperRepositoryStub()
}

interface SutTypes {
  sut: DbAddDeveloper
  createDeveloperRepositoryStub: CreateDeveloperRepository
}

const makeSut = (): SutTypes => {
  const createDeveloperRepositoryStub = makeCreateDeveloperRepositoryStub()
  const sut = new DbAddDeveloper(createDeveloperRepositoryStub)

  return {
    sut,
    createDeveloperRepositoryStub
  }
}

describe('DbAddDeveloper', () => {
  test('Should call CreateDeveloperRepository with correct values', async () => {
    const { sut, createDeveloperRepositoryStub } = makeSut()

    const createSpy = jest.spyOn(createDeveloperRepositoryStub, 'create')
    await sut.add(makeFakeParams())

    expect(createSpy).toHaveBeenCalledWith(makeFakeParams())
  })

  test('Should return an Developer on success', async () => {
    const { sut } = makeSut()

    const createdDeveloper = await sut.add(makeFakeParams())

    expect(createdDeveloper).toEqual(makeFakeDeveloper())
  })
})
