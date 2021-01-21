import { notFound, ok, serverError } from '@/Application/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/Application/protocols'
import { GetOneDeveloper } from '@/Domain/developer/usecases/GetOneDeveloper'
import { NotFoundError } from '@/Domain/shared/errors/NotFoundError'

export class GetOneDeveloperController implements Controller {
  constructor (
    private readonly getOneDeveloper: GetOneDeveloper
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const developer = await this.getOneDeveloper.get(httpRequest.params.id)
      return ok(developer)
    } catch (err) {
      if (err instanceof NotFoundError) return notFound(err)
      return serverError(err)
    }
  }
}
