//  user model
const {User} = require('../models')

// const myMiddleware = (req, res, next) => {
//     console.log('Middleware executed');
//     next();
//   };
//   router.use(myMiddleware)


const  getUsers = async(req, res, next) => {
    try {
        const users = await User.findAll()
    res.status(200).json(users)
    } catch (error) {
        next(error)
    }
} 
const createUser = async(req, res, next) => {
    try {
        const body = req.body
    console.log(body)
    const user = await User.create(body)
    res.status(201).json(user)
    } catch (error) {
        next(error)
    }
} 

module.exports = {getUsers, createUser}

