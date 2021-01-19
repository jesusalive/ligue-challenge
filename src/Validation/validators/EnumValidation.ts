import { Validation } from '@/Application/protocols'
import { InvalidParamError } from '@/Domain/shared/errors'
import { NullableOptions } from '../protocols/NullableOptions'

interface EnumValidationOptions extends NullableOptions {}

export class EnumValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly enumOptions: any[],
    private readonly options?: EnumValidationOptions
  ) {}

  validate (input: any): Error {
    if (!input[this.fieldName] && this.options?.nullable) return null

    for (const option of this.enumOptions) {
      if (option === input[this.fieldName]) return null
    }

    return new InvalidParamError(this.fieldName)
  }
}
