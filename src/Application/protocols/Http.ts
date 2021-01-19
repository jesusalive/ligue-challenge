export interface HttpResponse {
  statusCode: number
  body?: any
}

export interface HttpRequest {
  body?: any
  params?: any
  headers?: {
    authorization?: string
  }
  query?: any
}
