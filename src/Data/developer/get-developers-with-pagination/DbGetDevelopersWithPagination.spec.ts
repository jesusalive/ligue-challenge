import { DeveloperModel } from '@/Domain/developer/Developer'
import { GetAndCountAllDevelopersRepository, GetAndCountAllDevelopersReturn } from '@/Domain/developer/repositories/GetAndCountAllDevelopersRepository'
import { DbGetDevelopersWithPagination } from './DbGetDevelopersWithPagination'

const makeFakeDevelopersArray = (): DeveloperModel[] => ([
  {
    id: 'any_id',
    age: 10,
    sex: 'H',
    hobby: 'games',
    name: 'any_name',
    birthdate: new Date('01-01-2020')
  },
  {
    id: 'any_other_id',
    age: 10,
    sex: 'H',
    hobby: 'other_hobby',
    name: 'any_other_name',
    birthdate: new Date('01-01-2020')
  }
])

const makeGetAndCounAllReturn = (): GetAndCountAllDevelopersReturn => ({
  developers: makeFakeDevelopersArray(),
  total: 2
})

const makeGetAndCountAllDevelopersRepositoryStub = (): GetAndCountAllDevelopersRepository => {
  class GetAndCountAllDevelopersRepositoryStub implements GetAndCountAllDevelopersRepository {
    async getAndCountAll (): Promise<GetAndCountAllDevelopersReturn> {
      return await new Promise(resolve => resolve(makeGetAndCounAllReturn()))
    }
  }
  return new GetAndCountAllDevelopersRepositoryStub()
}

interface SutTypes {
  sut: DbGetDevelopersWithPagination
  getAndCountAllDevelopersRepositoryStub: GetAndCountAllDevelopersRepository
}

const makeSut = (): SutTypes => {
  const getAndCountAllDevelopersRepositoryStub = makeGetAndCountAllDevelopersRepositoryStub()
  const sut = new DbGetDevelopersWithPagination(getAndCountAllDevelopersRepositoryStub)

  return {
    sut,
    getAndCountAllDevelopersRepositoryStub
  }
}

describe('DbGetDevelopersWithPagination', () => {
  test('Should GetAndCountAllDevelopersRepository with correct values', async () => {
    const { sut, getAndCountAllDevelopersRepositoryStub } = makeSut()

    const getAndCountAllSpy = jest.spyOn(getAndCountAllDevelopersRepositoryStub, 'getAndCountAll')
    await sut.get({ name: 'any_name' }, 2)

    expect(getAndCountAllSpy).toHaveBeenCalledWith({ name: 'any_name' }, 5, 5)
  })
})
