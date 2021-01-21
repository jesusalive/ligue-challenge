import { DeveloperModel } from '@/Domain/developer/Developer'
import { GetDeveloperByIdRepository } from '@/Domain/developer/repositories/GetDeveloperByIdRepository'
import { DbGetOneDeveloper } from './DbGetOneDeveloper'

const makeFakeDeveloper = (): DeveloperModel => ({
  id: 'any_id',
  age: 10,
  sex: 'H',
  hobby: 'games',
  name: 'any_name',
  birthdate: new Date('01-01-2020')
})

const makeGetDeveloperByIdRepositoryStub = (): GetDeveloperByIdRepository => {
  class GetDeveloperByIdRepositoryStub implements GetDeveloperByIdRepository {
    async getById (): Promise<DeveloperModel> {
      return await new Promise(resolve => resolve(makeFakeDeveloper()))
    }
  }
  return new GetDeveloperByIdRepositoryStub()
}

interface SutTypes {
  sut: DbGetOneDeveloper
  getDeveloperByIdRepositoryStub: GetDeveloperByIdRepository
}

const makeSut = (): SutTypes => {
  const getDeveloperByIdRepositoryStub = makeGetDeveloperByIdRepositoryStub()
  const sut = new DbGetOneDeveloper(getDeveloperByIdRepositoryStub)

  return {
    sut,
    getDeveloperByIdRepositoryStub
  }
}

describe('DbGetOneDeveloper', () => {
  test('Should call GetDeveloperByIdRepository with correct id', async () => {
    const { sut, getDeveloperByIdRepositoryStub } = makeSut()

    const getByIdSpy = jest.spyOn(getDeveloperByIdRepositoryStub, 'getById')
    await sut.get('any_id')

    expect(getByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
