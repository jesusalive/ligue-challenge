import { InvalidParamError } from '@/Domain/shared/errors'
import { DateValidator } from '../protocols/DateValidator'
import { DateStringValidation } from './DateStringValidation'

const makeFakeDateValidator = (): DateValidator => {
  class DateValidatorStub implements DateValidator {
    isValid (dateString: string): boolean {
      return true
    }
  }
  return new DateValidatorStub()
}
interface SutTypes {
  sut: DateStringValidation
  dateValidator: DateValidator
}

interface SutOptions {
  nullable?: boolean
}

const makeSut = (options?: SutOptions): SutTypes => {
  const dateValidator = makeFakeDateValidator()
  const sut = new DateStringValidation(
    'fieldname',
    dateValidator,
    options?.nullable ? { nullable: options.nullable } : undefined
  )

  return {
    sut,
    dateValidator
  }
}

describe('DateStringValidation', () => {
  test('Should call DateValidator with correct value', () => {
    const { sut, dateValidator } = makeSut()

    const isValidSpy = jest.spyOn(dateValidator, 'isValid')
    sut.validate({ fieldname: 'valid_date' })

    expect(isValidSpy).toHaveBeenCalledWith('valid_date')
  })

  test('Should return null if field is falsy and nullable is true', () => {
    const { sut } = makeSut({ nullable: true })

    const sutResult = sut.validate({ fieldname: undefined })

    expect(sutResult).toBeNull()
  })

  test('Should return InvalidParamError if fails with correct fieldname', () => {
    const { sut, dateValidator } = makeSut()

    const isValidSpy = jest.spyOn(dateValidator, 'isValid')
    isValidSpy.mockReturnValueOnce(false)
    const validationResult = sut.validate({ fieldname: 'invalid_date' })

    expect(validationResult).toEqual(new InvalidParamError('fieldname'))
  })
})
