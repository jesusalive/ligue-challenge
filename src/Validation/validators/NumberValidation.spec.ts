import { InvalidParamError } from '@/Domain/shared/errors'
import { NumberValidation } from './NumberValidation'

interface SutOptions {
  nullable?: boolean
}

const makeSut = (options?: SutOptions): NumberValidation =>
  new NumberValidation('field', options?.nullable ? { nullable: options.nullable } : undefined)

describe('NumberValidation', () => {
  test('Should return a InvalidParamError if not a number', () => {
    const sut = makeSut()

    const err = sut.validate({ field: 'not_a_number' })

    expect(err).toEqual(new InvalidParamError('field'))
  })

  test('Should return null if field is falsy and nullable is true', () => {
    const sut = makeSut({ nullable: true })

    const sutResult = sut.validate({ enumField: undefined })

    expect(sutResult).toBeNull()
  })

  test('Should return null if is a number', () => {
    const sut = makeSut()

    const err = sut.validate({ field: '23' })

    expect(err).toBeNull()
  })
})
