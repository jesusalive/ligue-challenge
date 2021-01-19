import { noContent, notFound, serverError } from '@/Application/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/Application/protocols'
import { RemoveDeveloper } from '@/Domain/developer/usecases/RemoveDeveloper'
import { NotFoundError } from '@/Domain/shared/errors/NotFoundError'

export class RemoveDeveloperController implements Controller {
  constructor (
    private readonly removeDeveloper: RemoveDeveloper
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.removeDeveloper.remove(httpRequest.params.id)
      return noContent()
    } catch (err) {
      if (err instanceof NotFoundError) return notFound(err)
      return serverError(err)
    }
  }
}
