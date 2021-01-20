import { notFound, ok, serverError } from '@/Application/helpers/http/http-helper'
import { HttpRequest } from '@/Application/protocols'
import { DeveloperModel } from '@/Domain/developer/Developer'
import { GetDevelopersWithPagination, GetDevelopersWithPaginationReturn } from '@/Domain/developer/usecases/GetDevelopersWithPagination'
import { NotFoundError } from '@/Domain/shared/errors/NotFoundError'
import { GetAllDevelopersWithPaginationController } from './GetAllDevelopersWithPaginationController'

const makeFakeRequest = (): HttpRequest => ({
  query: {
    name: 'any_name'
  },
  params: {
    page: 1
  }
})

const makeFakeDevelopersArray = (): DeveloperModel[] => ([
  {
    id: 'any_id',
    age: 10,
    sex: 'H',
    hobby: 'games',
    name: 'any_name',
    birthdate: new Date('01-01-2020')
  },
  {
    id: 'any_other_id',
    age: 10,
    sex: 'H',
    hobby: 'other_hobby',
    name: 'any_name',
    birthdate: new Date('01-01-2020')
  }
])

const makeGetDevelopersWithPaginationResult = (): GetDevelopersWithPaginationReturn => ({
  developers: makeFakeDevelopersArray(),
  page: 1,
  totalOfPages: 1
})

const makeGetDevelopersWithPaginationStub = (): GetDevelopersWithPagination => {
  class GetDevelopersWithPaginationStub implements GetDevelopersWithPagination {
    async get (): Promise<GetDevelopersWithPaginationReturn> {
      return await new Promise(resolve => resolve(makeGetDevelopersWithPaginationResult()))
    }
  }
  return new GetDevelopersWithPaginationStub()
}

interface SutTypes {
  sut: GetAllDevelopersWithPaginationController
  getDevelopersWithPaginationStub: GetDevelopersWithPagination
}

const makeSut = (): SutTypes => {
  const getDevelopersWithPaginationStub = makeGetDevelopersWithPaginationStub()
  const sut = new GetAllDevelopersWithPaginationController(getDevelopersWithPaginationStub)

  return {
    sut,
    getDevelopersWithPaginationStub
  }
}

describe('GetAllDevelopersController', () => {
  test('Should call GetDevelopersWithPagination with correct values', async () => {
    const { sut, getDevelopersWithPaginationStub } = makeSut()

    const getSpy = jest.spyOn(getDevelopersWithPaginationStub, 'get')

    const fakeRequest = makeFakeRequest()
    await sut.handle(fakeRequest)

    expect(getSpy).toHaveBeenCalledWith(
      {
        name: fakeRequest.query.name
      },
      fakeRequest.params.page
    )
  })

  test('Should return a serverError if GetDevelopersWithPagination throws a unexpected error', async () => {
    const { sut, getDevelopersWithPaginationStub } = makeSut()

    const getSpy = jest.spyOn(getDevelopersWithPaginationStub, 'get')
    getSpy.mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return notFound if GetDevelopersWithPagination returns empty developers array', async () => {
    const { sut, getDevelopersWithPaginationStub } = makeSut()

    const getSpy = jest.spyOn(getDevelopersWithPaginationStub, 'get')
    getSpy.mockResolvedValueOnce({
      developers: [],
      page: 1,
      totalOfPages: 1
    })

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(notFound(new NotFoundError('No developer found')))
  })

  test('Should return ok with data on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(ok(makeGetDevelopersWithPaginationResult()))
  })
})
