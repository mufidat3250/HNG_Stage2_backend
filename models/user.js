const {Model, DataTypes} = require('sequelize')

const {sequelize} = require('../utils/db')

class User extends Model {}
User.init({
    userId: {
        type: DataTypes.STRING,
        primaryKey:true,
        unique:true,
        allowNull:false,
        validate: {
            notNull: { msg: 'UserId is required' },
            notEmpty: { msg: 'UserId cannot be empty' },
          },
    },
    firstName: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    passwordHash: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type: DataTypes.STRING,
    },
}, {
    sequelize, 
    underscored:true,
    timestamps: true,
    modelName: "user"
})

module.exports = User