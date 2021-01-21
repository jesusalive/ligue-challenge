import { notFound, ok, serverError } from '@/Application/helpers/http/http-helper'
import { HttpRequest } from '@/Application/protocols'
import { DeveloperModel } from '@/Domain/developer/Developer'
import { GetOneDeveloper } from '@/Domain/developer/usecases/GetOneDeveloper'
import { NotFoundError } from '@/Domain/shared/errors/NotFoundError'
import { GetOneDeveloperController } from './GetOneDeveloperController'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

const makeFakeDeveloper = (): DeveloperModel => ({
  id: 'any_id',
  age: 10,
  sex: 'H',
  hobby: 'games',
  name: 'any_name',
  birthdate: new Date('01-01-2020')
})

const makeGetOneDeveloperStub = (): GetOneDeveloper => {
  class GetOneDeveloperStub implements GetOneDeveloper {
    async get (): Promise<DeveloperModel> {
      return await new Promise(resolve => resolve(makeFakeDeveloper()))
    }
  }
  return new GetOneDeveloperStub()
}

interface SutTypes {
  sut: GetOneDeveloperController
  getOneDeveloperStub: GetOneDeveloper
}

const makeSut = (): SutTypes => {
  const getOneDeveloperStub = makeGetOneDeveloperStub()
  const sut = new GetOneDeveloperController(getOneDeveloperStub)

  return {
    sut,
    getOneDeveloperStub
  }
}

describe('GetOneDeveloperController', () => {
  test('Should return serverError if GetOneDeveloper throws a unexpected error', async () => {
    const { sut, getOneDeveloperStub } = makeSut()

    const getSpy = jest.spyOn(getOneDeveloperStub, 'get')
    getSpy.mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return notFound if GetOneDeveloper throws a NotFoundError', async () => {
    const { sut, getOneDeveloperStub } = makeSut()

    const getSpy = jest.spyOn(getOneDeveloperStub, 'get')
    getSpy.mockRejectedValueOnce(new NotFoundError('Developer not found'))

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(notFound(new NotFoundError('Developer not found')))
  })

  test('Should return ok with developer data on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(ok(makeFakeDeveloper()))
  })
})
