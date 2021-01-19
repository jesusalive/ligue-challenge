import { HttpRequest } from '@/Application/protocols'
import { DeveloperModel } from '@/Domain/developer/Developer'
import { RemoveDeveloper } from '@/Domain/developer/usecases/RemoveDeveloper'
import { RemoveDeveloperController } from './RemoveDeveloperController'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

const makeRemoveDeveloperStub = (): RemoveDeveloper => {
  class RemoveDeveloperStub implements RemoveDeveloper {
    async remove (): Promise<DeveloperModel> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new RemoveDeveloperStub()
}

interface SutTypes {
  sut: RemoveDeveloperController
  removeDeveloperStub: RemoveDeveloper
}

const makeSut = (): SutTypes => {
  const removeDeveloperStub = makeRemoveDeveloperStub()
  const sut = new RemoveDeveloperController(removeDeveloperStub)

  return {
    sut,
    removeDeveloperStub
  }
}

describe('RemoveDeveloperController', () => {
  test('Should call RemoveDeveloper with correct id', async () => {
    const { sut, removeDeveloperStub } = makeSut()

    const removeSpy = jest.spyOn(removeDeveloperStub, 'remove')

    const fakeRequest = makeFakeRequest()
    await sut.handle(fakeRequest)

    expect(removeSpy).toHaveBeenCalledWith(fakeRequest.params.id)
  })
})
