import { Validation } from '@/Application/protocols'
import { InvalidParamError } from '@/Domain/shared/errors'

export class EnumValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly enumOptions: any[]
  ) {}

  validate (input: any): Error {
    for (const option of this.enumOptions) {
      if (option === input[this.fieldName]) return null
    }

    return new InvalidParamError(this.fieldName)
  }
}
