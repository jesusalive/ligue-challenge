import { DateStringValidatorAdapter } from './DateStringValidatorAdapter'
import validator from 'validator'

describe('DataStringValidator Adapter', () => {
  test('Should call validator toDate with correct input', () => {
    const sut = new DateStringValidatorAdapter()
    const toDateSpy = jest.spyOn(validator, 'toDate')

    sut.isValid('01-01-2020')

    expect(toDateSpy).toHaveBeenCalledWith('01-01-2020')
  })

  test('Should return true on success', () => {
    const sut = new DateStringValidatorAdapter()

    const isValid = sut.isValid('01-01-2020')

    expect(isValid).toBe(true)
  })

  test('Should return false if date is invalid', () => {
    const sut = new DateStringValidatorAdapter()

    const isValid = sut.isValid('01-01-invalid_date')

    expect(isValid).toBe(false)
  })
})
