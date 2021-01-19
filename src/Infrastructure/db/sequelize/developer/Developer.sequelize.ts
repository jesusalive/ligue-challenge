import connectionInstance from '@/Infrastructure/db/sequelize/connection-instance'

import { Model, DataTypes } from 'sequelize'

interface DeveloperAttributes {
  id: number
  name: string
  sex: 'H' | 'M'
  age: number
  hobby: string
  birthdate: Date
}

interface DeveloperCreationAttributes extends Omit<DeveloperAttributes, 'id'> {}

class Developer extends Model<DeveloperAttributes, DeveloperCreationAttributes> implements DeveloperAttributes {
  id: number
  name: string
  sex: 'H' | 'M'
  age: number
  hobby: string
  birthdate: Date
}

export const fields = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  sex: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hobby: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}

export const defaultOptions = {
  tableName: 'developer',
  timestamps: false
}

Developer.init(fields, {
  ...defaultOptions,
  sequelize: connectionInstance
})

export default Developer
