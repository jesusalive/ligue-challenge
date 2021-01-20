import { ok, serverError } from '@/Application/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/Application/protocols'
import { GetAllDevelopers } from '@/Domain/developer/usecases/GetAllDevelopers'

export class GetAllDevelopersController implements Controller {
  constructor (
    private readonly getAllDevelopers: GetAllDevelopers
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const developers = await this.getAllDevelopers.getAll()
      return ok(developers)
    } catch (err) {
      return serverError(err)
    }
  }
}
