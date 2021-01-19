import { UpdateDeveloperController } from './UpdateDeveloperController'
import { HttpRequest, Validation } from '@/Application/protocols'
import { badRequest, noContent, serverError, notFound } from '@/Application/helpers/http/http-helper'
import { UpdateDeveloper } from '@/Domain/developer/usecases/UpdateDeveloper'
import { DeveloperModel } from '@/Domain/developer/Developer'
import { NotFoundError } from '@/Domain/shared/errors/NotFoundError'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    age: 10,
    sex: 'H',
    hobby: 'games',
    birthdate: new Date('01-01-2020')
  },
  params: {
    id: 1
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

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeUpdateDeveloperStub = (): UpdateDeveloper => {
  class UpdateDeveloperStub implements UpdateDeveloper {
    async update (): Promise<DeveloperModel> {
      return await new Promise(resolve => resolve(makeFakeDeveloper()))
    }
  }
  return new UpdateDeveloperStub()
}

interface SutTypes {
  sut: UpdateDeveloperController
  validationStub: Validation
  updateDeveloperStub: UpdateDeveloper
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const updateDeveloperStub = makeUpdateDeveloperStub()
  const sut = new UpdateDeveloperController(validationStub, updateDeveloperStub)

  return {
    sut,
    validationStub,
    updateDeveloperStub
  }
}

describe('CreateDeveloperController', () => {
  test('Should return badRequest if validation returns any error', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')
    validateSpy.mockReturnValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call UpdateDeveloper with correct values', async () => {
    const { sut, updateDeveloperStub } = makeSut()

    const updateSpy = jest.spyOn(updateDeveloperStub, 'update')

    const fakeRequest = makeFakeRequest()
    await sut.handle(fakeRequest)

    expect(updateSpy).toHaveBeenCalledWith(1, fakeRequest.body)
  })

  test('Should return serverError if UpdateDeveloper throws a unexpected error', async () => {
    const { sut, updateDeveloperStub } = makeSut()

    const updateSpy = jest.spyOn(updateDeveloperStub, 'update')
    updateSpy.mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return notFound if UpdateDeveloper throws a NotFoundError', async () => {
    const { sut, updateDeveloperStub } = makeSut()

    const updateSpy = jest.spyOn(updateDeveloperStub, 'update')
    updateSpy.mockRejectedValueOnce(new NotFoundError('any_message'))

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(notFound(new NotFoundError('any_message')))
  })

  test('Should return noContent on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(noContent())
  })
})
