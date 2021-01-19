import { HttpRequest, Validation } from '@/Application/protocols'
import { CreateDeveloperController } from './CreateDeveloperController'

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
  sut: CreateDeveloperController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new CreateDeveloperController(validationStub)

  return {
    sut,
    validationStub
  }
}

describe('CreateDeveloperController', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    const fakeRequest = makeFakeRequest()
    await sut.handle(fakeRequest)

    expect(validateSpy).toHaveBeenCalledWith(fakeRequest.body)
  })
})
