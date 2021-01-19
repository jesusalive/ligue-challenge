import { InvalidParamError } from '@/Domain/shared/errors'
import { EnumValidation } from './EnumValidation'

interface SutTypes {
  sut: EnumValidation
}

const makeSut = (): SutTypes => {
  const sut = new EnumValidation('enumField', ['enumOption1', 'enumOption2'])

  return {
    sut
  }
}

describe('EnumValidation', () => {
  test('Should return null if input is permited', () => {
    const { sut } = makeSut()

    const sutResult = sut.validate({ enumField: 'enumOption1' })

    expect(sutResult).toBeNull()
  })

  test('Should return InvalidParamError if input is not permited', () => {
    const { sut } = makeSut()

    const sutResult = sut.validate({ enumField: 'notPermitedOption' })

    expect(sutResult).toEqual(new InvalidParamError('enumField'))
  })

  test('Should return InvalidParamError if input is undefined', () => {
    const { sut } = makeSut()

    const sutResult = sut.validate({})

    expect(sutResult).toEqual(new InvalidParamError('enumField'))
  })
})
