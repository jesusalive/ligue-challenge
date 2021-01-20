import { HttpRequest } from '@/Application/protocols'
import { DeveloperModel } from '@/Domain/developer/Developer'
import { GetDevelopersWithPagination, GetDevelopersWithPaginationReturn } from '@/Domain/developer/usecases/GetDevelopersWithPagination'
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

const makeGetDevelopersWithPaginationStub = (): GetDevelopersWithPagination => {
  class GetDevelopersWithPaginationStub implements GetDevelopersWithPagination {
    async get (): Promise<GetDevelopersWithPaginationReturn> {
      return await new Promise(resolve => {
        return resolve({
          developers: makeFakeDevelopersArray(),
          page: 1,
          totalOfPages: 1
        })
      })
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
})
