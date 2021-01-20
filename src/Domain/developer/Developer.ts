export interface DeveloperModel {
  id: string|number
  name: string
  sex: 'H' | 'M'
  age: number
  hobby: string
  birthdate: Date
}

export interface DeveloperModelWhereParam extends Partial<DeveloperModel> {}
