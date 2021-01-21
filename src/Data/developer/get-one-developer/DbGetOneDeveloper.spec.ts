import { DeveloperModel } from '@/Domain/developer/Developer'
import { GetDeveloperByIdRepository } from '@/Domain/developer/repositories/GetDeveloperByIdRepository'
import { NotFoundError } from '@/Domain/shared/errors/NotFoundError'
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

  test('Should throw if GetDeveloperByIdRepository throws', async () => {
    const { sut, getDeveloperByIdRepositoryStub } = makeSut()

    const getByIdSpy = jest.spyOn(getDeveloperByIdRepositoryStub, 'getById')
    getByIdSpy.mockRejectedValueOnce(new Error())

    const promise = sut.get('any_id')

    await expect(promise).rejects.toEqual(new Error())
  })

  test('Should throw a NotFoundError if GetDeveloperByIdRepository returns null', async () => {
    const { sut, getDeveloperByIdRepositoryStub } = makeSut()

    const getByIdSpy = jest.spyOn(getDeveloperByIdRepositoryStub, 'getById')
    getByIdSpy.mockResolvedValueOnce(null)

    const promise = sut.get('any_id')

    await expect(promise).rejects.toEqual(new NotFoundError('Developer not found'))
  })

  test('Should return a developer on success', async () => {
    const { sut } = makeSut()

    const developer = await sut.get('any_id')

    expect(developer).toEqual(makeFakeDeveloper())
  })
})
