import { DeveloperModel } from '../Developer'

export interface GetDeveloperByIdRepository {
  getById: (id: string|number) => Promise<DeveloperModel>
}
