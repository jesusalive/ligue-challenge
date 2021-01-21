import { DeveloperModel } from '../Developer'

export interface GetOneDeveloper {
  get: (id: string|number) => Promise<DeveloperModel>
}
