const User = require('./user')
const Organisation = require('./organisation')
const UserOrganisation = require('./userOrganization')

User.sync()
Organisation.sync()

// User.belongsToMany(Organisation, {
//     through: UserOrganisation,
//     as: 'organisations',
//     foreignKey: 'userId',
//     otherKey: 'organisationId',
//   });
//   Organisation.belongsToMany(User, {
//     through: UserOrganisation,
//     as: 'users',
//     foreignKey: 'organisationId',
//     otherKey: 'userId',
//   });
  

module.exports = { User, Organisation}