import { serverError, badRequest, created } from '@/Application/helpers/http/http-helper'
import { HttpRequest, Validation } from '@/Application/protocols'
import { DeveloperModel } from '@/Domain/developer/Developer'
import { AddDeveloper } from '@/Domain/developer/usecases/AddDeveloper'
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

const makeFakeDeveloper = (): DeveloperModel => ({
  id: 'any_id',
  age: 10,
  sex: 'H',
  hobby: 'games',
  name: 'any_name',
  birthdate: new Date('01-01-2020')
})

const makeAddDeveloperStub = (): AddDeveloper => {
  class AddDeveloperStub implements AddDeveloper {
    async add (): Promise<DeveloperModel> {
      return await new Promise(resolve => resolve(makeFakeDeveloper()))
    }
  }
  return new AddDeveloperStub()
}

interface SutTypes {
  sut: CreateDeveloperController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addDeveloperStub = makeAddDeveloperStub()
  const sut = new CreateDeveloperController(validationStub, addDeveloperStub)

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

  test('Should return serverError if validation throws a unexpected error', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')
    validateSpy.mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return badRequest if validation returns any error', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')
    validateSpy.mockReturnValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should return created on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(created({}))
  })
})
