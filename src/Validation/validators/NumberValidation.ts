import { Validation } from '@/Application/protocols'
import { InvalidParamError } from '@/Domain/shared/errors'

export class NumberValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error {
    if (isNaN(input[this.fieldName])) return new InvalidParamError(this.fieldName)
    return null
  }
}
