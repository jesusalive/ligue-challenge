import { badRequest, serverError, created } from '@/Application/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/Application/protocols'
import { AddDeveloper } from '@/Domain/developer/usecases/AddDeveloper'

export class CreateDeveloperController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addDeveloper: AddDeveloper
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const err = this.validation.validate(httpRequest.body)
      if (err) return badRequest(err)

      const developer = await this.addDeveloper.add({
        ...httpRequest.body,
        birthdate: new Date(httpRequest.body.birthdate)
      })

      return created(developer)
    } catch (err) {
      return serverError(err)
    }
  }
}
