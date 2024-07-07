const { response } = require("express")
const {Sequelize} = require('sequelize')

const errorHandler = (err, req, res, next) => {
    if (err instanceof Sequelize.ValidationError) {
      const errorMessages = err.errors.map(e => e.message);
      const errorPath = err.errors.map(e => e.path);
       return res.status(422).json({ errors: {
        field: errorPath[0],
        message: errorMessages[0]
       } });
    }
    res.status(500).json({ error: 'An unexpected error occurred' })
    next(err)
}
module.exports = errorHandler