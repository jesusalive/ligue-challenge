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
export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})
export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})
export const noContent = (): HttpResponse => ({
  statusCode: 204
})
