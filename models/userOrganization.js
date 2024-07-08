const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class UserOrganisation extends Model {}

UserOrganisation.init({
  userId: {
    type: DataTypes.STRING,
    references: {
      model: 'users',
      key: 'userId',
    },
  },
  organisationId: {
    type: DataTypes.STRING,
    references: {
      model: 'organisations',
      key: 'organisationId',
    },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user_organisation',
});

module.exports = UserOrganisation;