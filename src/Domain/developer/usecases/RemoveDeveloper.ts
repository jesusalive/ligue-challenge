export interface RemoveDeveloper {
  remove: (id: string|number) => Promise<void>
}
