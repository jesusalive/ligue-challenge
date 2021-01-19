import { DeveloperModel } from '../Developer'

export interface UpdateDeveloperData extends Partial<Omit<DeveloperModel, 'id'>> {}

export interface UpdateDeveloper {
  update: (id: string|number, data: UpdateDeveloperData) => Promise<DeveloperModel>
}
