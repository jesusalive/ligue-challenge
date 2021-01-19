import { Validation } from '@/Application/protocols'
import { EnumValidation } from '@/Validation/validators/EnumValidation'
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

  return new ValidationComposite(validations)
}
