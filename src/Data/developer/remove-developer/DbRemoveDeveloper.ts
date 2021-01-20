import { DeleteDeveloperByIdRepository } from '@/Domain/developer/repositories/DeleteDeveloperByIdRepository'
import { RemoveDeveloper } from '@/Domain/developer/usecases/RemoveDeveloper'

export class DbRemoveDeveloper implements RemoveDeveloper {
  constructor (
    private readonly deleteDeveloperByIdRepository: DeleteDeveloperByIdRepository
  ) {}

  async remove (id: string|number): Promise<void> {
    await this.deleteDeveloperByIdRepository.deleteById(id)
  }
}
