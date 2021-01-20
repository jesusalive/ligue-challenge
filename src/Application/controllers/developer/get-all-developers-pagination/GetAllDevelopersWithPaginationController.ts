import { notFound, ok, serverError } from '@/Application/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/Application/protocols'
import { GetDevelopersWithPagination } from '@/Domain/developer/usecases/GetDevelopersWithPagination'
import { NotFoundError } from '@/Domain/shared/errors/NotFoundError'

export class GetAllDevelopersWithPaginationController implements Controller {
  constructor (
    private readonly getAllDevelopers: GetDevelopersWithPagination
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const where = {
        ...httpRequest.query
      }

      const searchResult = await this.getAllDevelopers.get(where, httpRequest.params.page)
      if (searchResult.developers.length < 1) return notFound(new NotFoundError('No developer found'))

      return ok(searchResult)
    } catch (err) {
      return serverError(err)
    }
  }
}
