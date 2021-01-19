import { Controller, HttpRequest, HttpResponse, Validation } from '@/Application/protocols'

export class CreateDeveloperController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return null
  }
}
