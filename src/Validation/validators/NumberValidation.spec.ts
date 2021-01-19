import { InvalidParamError } from '@/Domain/shared/errors'
import { NumberValidation } from './NumberValidation'

const makeSut = (): NumberValidation => new NumberValidation('field')

describe('NumberValidation', () => {
  test('Should return a InvalidParamError if not a number', () => {
    const sut = makeSut()

    const err = sut.validate({ field: 'not_a_number' })

    expect(err).toEqual(new InvalidParamError('field'))
  })

  test('Should return null if is a number', () => {
    const sut = makeSut()

    const err = sut.validate({ field: '23' })

    expect(err).toBeNull()
  })
})
