const {Sequelize, QueryTypes} = require('sequelize')
const { DATABASE_URL } = require('./config')

if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in the environment variables');
  }

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false,
  }
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('database connected')
    const users = await sequelize.query("SELECT * FROM users", { type: QueryTypes.SELECT })
    console.log(users)
  } catch (err) {
    console.log('connecting database failed')
    return process.exit(1)
  }
    return null
}

module.exports = { connectToDatabase, sequelize }