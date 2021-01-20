import { DeleteDeveloperByIdRepository } from '@/Domain/developer/repositories/DeleteDeveloperByIdRepository'
import { DbRemoveDeveloper } from './DbRemoveDeveloper'

const makeDeleteDeveloperByIdRepositoryStub = (): DeleteDeveloperByIdRepository => {
  class DeleteDeveloperByIdRepositoryStub implements DeleteDeveloperByIdRepository {
    async deleteById (): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new DeleteDeveloperByIdRepositoryStub()
}

interface SutTypes {
  sut: DbRemoveDeveloper
  deleteDeveloperByIdRepositoryStub: DeleteDeveloperByIdRepository
}

const makeSut = (): SutTypes => {
  const deleteDeveloperByIdRepositoryStub = makeDeleteDeveloperByIdRepositoryStub()
  const sut = new DbRemoveDeveloper(deleteDeveloperByIdRepositoryStub)

  return {
    sut,
    deleteDeveloperByIdRepositoryStub
  }
}

describe('DbAddDeveloper', () => {
  test('Should call DeleteDeveloperByIdRepository with correct id', async () => {
    const { sut, deleteDeveloperByIdRepositoryStub } = makeSut()

    const deleteSpy = jest.spyOn(deleteDeveloperByIdRepositoryStub, 'deleteById')
    await sut.remove('any_id')

    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })
})
