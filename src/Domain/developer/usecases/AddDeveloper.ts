import { DeveloperModel } from '../Developer'

export interface AddDeveloper {
  add: (data: DeveloperModel) => Promise<DeveloperModel>
}
