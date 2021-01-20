import { DeleteDeveloperByIdRepository } from '@/Domain/developer/repositories/DeleteDeveloperByIdRepository'
import { RemoveDeveloper } from '@/Domain/developer/usecases/RemoveDeveloper'
import { NotFoundError } from '@/Domain/shared/errors/NotFoundError'

export class DbRemoveDeveloper implements RemoveDeveloper {
  constructor (
    private readonly deleteDeveloperByIdRepository: DeleteDeveloperByIdRepository
  ) {}

  async remove (id: string|number): Promise<void> {
    const removed = await this.deleteDeveloperByIdRepository.deleteById(id)
    if (!removed) throw new NotFoundError('Developer not found')
  }
}
