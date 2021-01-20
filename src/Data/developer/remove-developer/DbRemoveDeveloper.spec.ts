import { DeleteDeveloperByIdRepository } from '@/Domain/developer/repositories/DeleteDeveloperByIdRepository'
import { NotFoundError } from '@/Domain/shared/errors/NotFoundError'
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

  test('Should throw if DeleteDeveloperByIdRepository throws', async () => {
    const { sut, deleteDeveloperByIdRepositoryStub } = makeSut()

    const deleteSpy = jest.spyOn(deleteDeveloperByIdRepositoryStub, 'deleteById')
    deleteSpy.mockRejectedValueOnce(new NotFoundError('any_message'))

    const promise = sut.remove('any_id')

    await expect(promise).rejects.toEqual(new NotFoundError('any_message'))
  })
})
