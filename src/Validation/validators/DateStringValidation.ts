import { Validation } from '@/Application/protocols'
import { InvalidParamError } from '@/Domain/shared/errors'
import { DateValidator } from '../protocols/DateValidator'
import { NullableOptions } from '../protocols/NullableOptions'

interface DateStringValidationOptions extends NullableOptions {}

export class DateStringValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly dateValidator: DateValidator,
    private readonly options?: DateStringValidationOptions
  ) {}

  validate (input: any): Error {
    if (!input[this.fieldName] && this.options?.nullable) return null

    const isValid = this.dateValidator.isValid(input[this.fieldName])

    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
