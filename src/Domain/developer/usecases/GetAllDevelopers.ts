import { DeveloperModel } from '../Developer'

export interface GetAllDevelopers {
  getAll: () => Promise<DeveloperModel[]>
}
