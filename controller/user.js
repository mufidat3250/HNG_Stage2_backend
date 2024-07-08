//  user model
const { v4: uuidv4 } = require('uuid');
const {User} = require('../models')
const bcrypt = require('bcrypt');
const { sync } = require('../models/user');


const  getUsers = async(req, res, next) => {
    try {
        const users = await User.findAll()
    res.status(200).json(users)
    } catch (error) {
        next(error)
    }
} 

const getUser = async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id)
        // console.log(user)

        res.status(200).json({
            status: "success",
        message: "user's record",
        data: {
          userId: user.id,
          firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        }
    })
    } catch (error) {
        next()
    }
}

module.exports = {getUsers, getUser}

