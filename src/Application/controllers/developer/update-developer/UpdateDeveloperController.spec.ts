import { UpdateDeveloperController } from './UpdateDeveloperController'
import { HttpRequest, Validation } from '@/Application/protocols'
import { badRequest } from '@/Application/helpers/http/http-helper'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    age: 10,
    sex: 'H',
    hobby: 'games',
    birthdate: new Date('01-01-2020')
  }
})

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: UpdateDeveloperController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new UpdateDeveloperController(validationStub)

  return {
    sut,
    validationStub
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
})
