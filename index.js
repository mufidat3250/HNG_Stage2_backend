require('dotenv').config()

const express = require('express')
require('express-async-errors')
const app = express()
const userRouter = require('./routes/user')
const errorHandler = require('./middlewares/errorhandler')
const unknownEndpoint = require('./middlewares/unknownEndpoint')






const mufidat = {
    name:'Mufidat',
    id:'oooooo'
}
app.use(express.json())
app.use("/api/users", userRouter)

app.get('/', (req, res)=> {
    try {
        res.json(mufidat)
    } catch (error) {
        console.log('something went wrong', error)
    }
} )



app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})