import { Validation } from '@/Application/protocols'
import { DateStringValidatorAdapter } from '@/Infrastructure/validators/DateStringValidatorAdapter'
import { DateStringValidation } from '@/Validation/validators/DateStringValidation'
import { EnumValidation } from '@/Validation/validators/EnumValidation'
import { NumberValidation } from '@/Validation/validators/NumberValidation'
import { ValidationComposite } from '@/Validation/validators/ValidationComposite'

export const makeUpdateDeveloperValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new EnumValidation('sex', ['H', 'M'], {
    nullable: true
  }))
  validations.push(
    new DateStringValidation('birthdate', new DateStringValidatorAdapter(), {
      nullable: true
    })
  )
  validations.push(new NumberValidation('age', {
    nullable: true
  }))

  return new ValidationComposite(validations)
}
