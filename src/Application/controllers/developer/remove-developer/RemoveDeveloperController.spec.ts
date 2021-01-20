import { noContent, notFound, serverError } from '@/Application/helpers/http/http-helper'
import { HttpRequest } from '@/Application/protocols'
import { RemoveDeveloper } from '@/Domain/developer/usecases/RemoveDeveloper'
import { NotFoundError } from '@/Domain/shared/errors/NotFoundError'
import { RemoveDeveloperController } from './RemoveDeveloperController'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

const makeRemoveDeveloperStub = (): RemoveDeveloper => {
  class RemoveDeveloperStub implements RemoveDeveloper {
    async remove (): Promise<void> {
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

  test('Should return serverError if RemoveDeveloper throws a unexpected error', async () => {
    const { sut, removeDeveloperStub } = makeSut()

    const removeSpy = jest.spyOn(removeDeveloperStub, 'remove')
    removeSpy.mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return notFound if RemoveDeveloper throws a NotFoundError', async () => {
    const { sut, removeDeveloperStub } = makeSut()

    const removeSpy = jest.spyOn(removeDeveloperStub, 'remove')
    removeSpy.mockRejectedValueOnce(new NotFoundError('any_message'))

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(notFound(new NotFoundError('any_message')))
  })

  test('Should return noContent on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(noContent())
  })
})
