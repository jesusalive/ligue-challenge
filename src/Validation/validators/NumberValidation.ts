import { Validation } from '@/Application/protocols'
import { InvalidParamError } from '@/Domain/shared/errors'
import { NullableOptions } from '../protocols/NullableOptions'

interface NumberValidationOptions extends NullableOptions {}

export class NumberValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly options?: NumberValidationOptions
  ) {}

  validate (input: any): Error {
    if (!input[this.fieldName] && this.options?.nullable) return null

    if (isNaN(input[this.fieldName])) return new InvalidParamError(this.fieldName)
    return null
  }
}
