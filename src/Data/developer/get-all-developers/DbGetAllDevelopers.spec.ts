import { DeveloperModel } from '@/Domain/developer/Developer'
import { GetAllDevelopersRepository } from '@/Domain/developer/repositories/GetAllDevelopersRepository'
import { DbGetAllDevelopers } from './DbGetAllDevelopers'

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

const makeGetAllDevelopersRepositoryStub = (): GetAllDevelopersRepository => {
  class GetAllDevelopersRepositoryStub implements GetAllDevelopersRepository {
    async getAll (): Promise<DeveloperModel[]> {
      return await new Promise(resolve => resolve(makeFakeDevelopersArray()))
    }
  }
  return new GetAllDevelopersRepositoryStub()
}

interface SutTypes {
  sut: DbGetAllDevelopers
  getAllDevelopersRepositoryStub: GetAllDevelopersRepository
}

const makeSut = (): SutTypes => {
  const getAllDevelopersRepositoryStub = makeGetAllDevelopersRepositoryStub()
  const sut = new DbGetAllDevelopers(getAllDevelopersRepositoryStub)

  return {
    sut,
    getAllDevelopersRepositoryStub
  }
}

describe('DbAddDeveloper', () => {
  test('Should call GetAllDevelopersRepository once time', async () => {
    const { sut, getAllDevelopersRepositoryStub } = makeSut()

    const getAllSpy = jest.spyOn(getAllDevelopersRepositoryStub, 'getAll')
    await sut.getAll()

    expect(getAllSpy).toHaveBeenCalledTimes(1)
  })
})
