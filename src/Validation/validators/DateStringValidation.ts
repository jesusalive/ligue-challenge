import { Validation } from '@/Application/protocols'
import { InvalidParamError } from '@/Domain/shared/errors'
import { DateValidator } from '../protocols/DateValidator'

export class DateStringValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly dateValidator: DateValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.dateValidator.isValid(input[this.fieldName])

    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
