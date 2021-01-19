import { Validation } from '@/Application/protocols'
import { DateStringValidatorAdapter } from '@/Infrastructure/validators/DateStringValidatorAdapter'
import { DateStringValidation } from '@/Validation/validators/DateStringValidation'
import { EnumValidation } from '@/Validation/validators/EnumValidation'
import { NumberValidation } from '@/Validation/validators/NumberValidation'
import { RequiredFieldValidation } from '@/Validation/validators/RequiredFieldValidation'
import { ValidationComposite } from '@/Validation/validators/ValidationComposite'

export const makeCreateDeveloperValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('name'))
  validations.push(new RequiredFieldValidation('sex'))
  validations.push(new RequiredFieldValidation('age'))
  validations.push(new RequiredFieldValidation('hobby'))
  validations.push(new RequiredFieldValidation('birthdate'))
  validations.push(new EnumValidation('sex', ['H', 'M']))
  validations.push(new DateStringValidation('birthdate', new DateStringValidatorAdapter()))
  validations.push(new NumberValidation('age'))

  return new ValidationComposite(validations)
}
