import { DateValidator } from '@/Validation/protocols/DateValidator'
import validator from 'validator'

export class DateStringValidatorAdapter implements DateValidator {
  isValid (dateString: string): boolean {
    const date = validator.toDate(dateString)
    return !!date
  }
}
