import { DeveloperModel } from '../Developer'
import { UpdateDeveloperData } from '../usecases/UpdateDeveloper'

export interface UpdateDeveloperRepository {
  update: (id: string|number, data: UpdateDeveloperData) => Promise<DeveloperModel>
}
