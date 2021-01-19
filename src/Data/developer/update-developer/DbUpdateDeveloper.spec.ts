import { DeveloperModel } from '@/Domain/developer/Developer'
import { UpdateDeveloperRepository } from '@/Domain/developer/repositories/UpdateDeveloperRepository'
import { DbUpdateDeveloper } from './DbUpdateDeveloper'

const makeFakeDeveloper = (): DeveloperModel => ({
  id: 'any_id',
  age: 10,
  sex: 'H',
  hobby: 'games',
  name: 'any_name',
  birthdate: new Date('01-01-2020')
})

const makeUpdateDeveloperRepositoryStub = (): UpdateDeveloperRepository => {
  class UpdateDeveloperRepositoryStub implements UpdateDeveloperRepository {
    async update (): Promise<DeveloperModel> {
      return await new Promise(resolve => resolve(makeFakeDeveloper()))
    }
  }
  return new UpdateDeveloperRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateDeveloper
  updateDeveloperRepositoryStub: UpdateDeveloperRepository
}

const makeSut = (): SutTypes => {
  const updateDeveloperRepositoryStub = makeUpdateDeveloperRepositoryStub()
  const sut = new DbUpdateDeveloper(updateDeveloperRepositoryStub)

  return {
    sut,
    updateDeveloperRepositoryStub
  }
}

describe('DbUpdateDeveloper', () => {
  test('Should call UpdateDeveloperRepository with correct values', async () => {
    const { sut, updateDeveloperRepositoryStub } = makeSut()

    const updateSpy = jest.spyOn(updateDeveloperRepositoryStub, 'update')
    await sut.update('any_id', {
      name: 'any_other_name'
    })

    expect(updateSpy).toHaveBeenCalledWith('any_id', {
      name: 'any_other_name'
    })
  })
})
