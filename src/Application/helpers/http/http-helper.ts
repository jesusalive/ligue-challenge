import { ServerError } from '@/Domain/shared/errors/ServerError'
import { HttpResponse } from '@/Application/protocols/Http'

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
