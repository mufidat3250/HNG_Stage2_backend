require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
require('express-async-errors')
const app = express()
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const organizationRouter = require('./routes/organization')
const errorHandler = require('./middlewares/errorhandler')
const unknownEndpoint = require('./middlewares/unknownEndpoint')
const tokenExtractor = require('./middlewares/tokenExtractor') 

app.use(express.json())
app.use(bodyParser.json());

app.use(tokenExtractor)

app.use("/api/users", userRouter)
app.use('/auth', authRouter)
app.use('/api/organisations', organizationRouter)


app.get('/', (req, res)=> {
    try {
        res.json("hello world")
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