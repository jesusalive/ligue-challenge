import { DeveloperModel } from '../Developer'

export interface GetAllDevelopersRepository {
  getAll: () => Promise<DeveloperModel[]>
}
