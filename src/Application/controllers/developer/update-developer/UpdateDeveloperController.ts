import { badRequest, noContent, serverError } from '@/Application/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/Application/protocols'
import { UpdateDeveloper } from '@/Domain/developer/usecases/UpdateDeveloper'

export class UpdateDeveloperController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateDeveloper: UpdateDeveloper
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const err = this.validation.validate(httpRequest.body)

      if (err) return badRequest(err)

      await this.updateDeveloper.update(httpRequest.params.id, httpRequest.body)

      return noContent()
    } catch (err) {
      return serverError(err)
    }
  }
}
