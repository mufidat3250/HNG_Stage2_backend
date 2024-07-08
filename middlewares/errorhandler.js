const {Sequelize} = require('sequelize');
const { sequelize } = require('../utils/db');

const errorHandler = (err, req, res, next) => {
    if (err instanceof Sequelize.ValidationError) {
      const errorMessages = err.errors.map(e => e.message);
      const errorPath = err.errors.map(e => e.path);
       return res.status(422).json({ errors: {
        field: errorPath[0],
        message: errorMessages[0]
       } });

    }else if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        status: "error",
        message: "field exist",
      })}
    else if(err.name === "SyntaxError"){
      return res.status(400).json({
        error: {
          message: "Syntax error",
        }
      })
     
    }else  if (!res.headersSent) {
     return res.status(err.status || 500).json({
        status: "error",
        message: err.message || 'Internal Server Error',
      });
    } else if (err.name ===  'JsonWebTokenError') {
      return response.status(401).json({ error: 'token invalid' })
    }else if (err.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      })
    }
    res.status(500).json({ error: 'An unexpected error occurred' })
    next(err)
}
module.exports = errorHandler