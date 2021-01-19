import { DeveloperModel } from '../Developer'

export interface AddDeveloper {
  add: (data: Omit<DeveloperModel, 'id'>) => Promise<DeveloperModel>
}
