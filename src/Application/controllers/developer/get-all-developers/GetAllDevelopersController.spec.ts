import { HttpRequest } from '@/Application/protocols'
import { DeveloperModel } from '@/Domain/developer/Developer'
import { GetAllDevelopers } from '@/Domain/developer/usecases/GetAllDevelopers'
import { GetAllDevelopersController } from './GetAllDevelopersController'

const makeFakeRequest = (): HttpRequest => ({})

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
    name: 'any_other_name',
    birthdate: new Date('01-01-2020')
  }
])

const makeGetAllDevelopersStub = (): GetAllDevelopers => {
  class GetAllDevelopersStub implements GetAllDevelopers {
    async getAll (): Promise<DeveloperModel[]> {
      return await new Promise(resolve => resolve(makeFakeDevelopersArray()))
    }
  }
  return new GetAllDevelopersStub()
}

interface SutTypes {
  sut: GetAllDevelopersController
  getAllDevelopersStub: GetAllDevelopers
}

const makeSut = (): SutTypes => {
  const getAllDevelopersStub = makeGetAllDevelopersStub()
  const sut = new GetAllDevelopersController(getAllDevelopersStub)

  return {
    sut,
    getAllDevelopersStub
  }
}

describe('GetAllDevelopersController', () => {
  test('Should call GetAllDevelopers once time', async () => {
    const { sut, getAllDevelopersStub } = makeSut()

    const getAllSpy = jest.spyOn(getAllDevelopersStub, 'getAll')

    const fakeRequest = makeFakeRequest()
    await sut.handle(fakeRequest)

    expect(getAllSpy).toHaveBeenCalledTimes(1)
  })
})
