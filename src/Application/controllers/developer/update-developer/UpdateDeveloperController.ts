import { badRequest, notFound, ok, serverError } from '@/Application/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/Application/protocols'
import { UpdateDeveloper } from '@/Domain/developer/usecases/UpdateDeveloper'
import { NotFoundError } from '@/Domain/shared/errors/NotFoundError'

export class UpdateDeveloperController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateDeveloper: UpdateDeveloper
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const err = this.validation.validate(httpRequest.body)
      if (err) return badRequest(err)

      const updatedDeveloper = await this.updateDeveloper.update(httpRequest.params.id, {
        ...httpRequest.body,
        birthdate: httpRequest.body.birthdate ? new Date(httpRequest.body.birthdate) : undefined
      })

      return ok(updatedDeveloper)
    } catch (err) {
      if (err instanceof NotFoundError) return notFound(err)
      return serverError(err)
    }
  }
}
