import { DeveloperModel } from '../Developer'

export interface RemoveDeveloper {
  remove: (id: string|number) => Promise<DeveloperModel>
}
