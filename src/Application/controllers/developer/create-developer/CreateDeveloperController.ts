import { badRequest, serverError } from '@/Application/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/Application/protocols'
export class CreateDeveloperController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const err = this.validation.validate(httpRequest.body)
      if (err) return badRequest(err)

      return null
    } catch (err) {
      return serverError(err)
    }
  }
}
