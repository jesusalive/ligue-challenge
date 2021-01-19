import { DeveloperModel } from '../Developer'

export interface CreateDeveloperRepository {
  create: (data: Omit<DeveloperModel, 'id'>) => Promise<DeveloperModel>
}
