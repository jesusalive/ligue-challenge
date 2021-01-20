export interface DeleteDeveloperByIdRepository {
  deleteById: (id: string|number) => Promise<void>
}
