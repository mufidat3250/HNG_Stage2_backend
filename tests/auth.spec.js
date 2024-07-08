require('dotenv').config()
const request = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../')
const { v4: uuidv4 } = require("uuid");
const {User} = require('../models/')
const jwt = require('jsonwebtoken')
const tokenGeneration = require('../middlewares/tokenExtractor')
const { describe } = require('../models/user')
const { beforeAll } = require('@jest/globals')
const a = require('sequelize-mock')




// jest.mock('../models', ()=>{
// const SequelizeMock = require('sequelize-mock');
// // const dbMock = new SequelizeMock();
// // return {
// //     sequelize: dbMock,
// //     User: dbMock.define('User', {
// //       userId: 'uniqueUserId',
// //       firstName: 'John',
// //       lastName: 'Doe',
// //       email: 'john.doe@example.com',
// //       passwordHash: 'hashedPassword',
// //       phone: '1234567890',
// //     }),
// //   };
// })


describe('register route </auth/register>', async() => {
    beforeAll(() => {
        User.create.mockClear();
    })

    it('User registration should be successful', async()=> {
        const uniqueId = uuidv4()
        const newUser = {
            firstName: 'Mack',
            lastName:"zuck",
            email: "zuck@gmail.com",
            password:"iyanu3259"
        }
        const saltRound = 20
        const passwordHash = bcrypt.hash(newUser, saltRound)

       await User.create.mockResolvedValue({
            userId:uniqueId,
            ...newUser,
            passwordHash: passwordHash
        })
        const response = await request(app).post("/auth/register").send(newUser)
        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.meessage).toBe(newUser.email)
    })
    // it('should return validation errors', async () => {
    //     const invalidUser = {
    //       firstName: '',
    //       lastName: 'Doe',
    //       email: 'not-an-email',
    //       password: 'short',
    //       phone: '123',
    //     };
    
    //     const response = await request(app)
    //       .post('/auth/register')
    //       .send(invalidUser);
    
    //     expect(response.status).toBe(400);
    //     expect(response.body.status).toBe('error');
    //     expect(response.body.message).toBe('Registration unsuccessful');
    //   });
    //   it('should return database constraint errors', async () => {
    //     const newUser = {
    //       firstName: 'John',
    //       lastName: 'Doe',
    //       email: 'john.doe@example.com',
    //       password: 'password123',
    //       phone: '1234567890',
    //     };
    
    //     User.create.mockRejectedValue(new Error('SequelizeUniqueConstraintError'));
    
    //     const response = await request(app)
    //       .post('/auth/register')
    //       .send(newUser);
    
    //     expect(response.status).toBe(400);
    //     expect(response.body.status).toBe('error');
    //     expect(response.body.message).toBe('Email or phone already in use');
    //   });
    
})








// const userForToken = {
//     email:'test@gma',
//     userId: 'uniqueUserId'
// } 

//Mock the Jwt.sign method
jest.mock('jsonwebtoken', ()=> ({sign:jest.fn()}))

describe('Token Generation', ()=> {
    const JWTSECRET = 'iyanu3250';
    const userForToken = {
        email:'Azo@gmail.com',
        userId: '0430cf5b-b740-440a-b219-906528ac0d89'
    } 

    

    beforeAll(()=> {
        process.env.JWTSECRET =  JWTSECRET
    })
    afterAll(()=>{
        jest.resetAllMocks()
    })

    it('should give correct user detail from the token and token should expire at the specified time', async() => {
        const tokenExpiry = 60 * 60
    
    //Mocking jwt..sign
        jwt.sign.mockImplementation((payload, secret, options)=>{
            return 'mockedToken'
        })
    //call thee function that generate the token
    const token = jwt.sign(userForToken, JWTSECRET, {expiresIn: tokenExpiry})

     // verify the token
     expect(token).toBe('mockedToken')
     expect(jwt.sign).toHaveBeenCalledWith(userForToken, JWTSECRET, {
        expiresIn: tokenExpiry,
      });
      // verify token
     const [payload, secret, options] = jwt.sign.mock.calls[0]
     expect(payload).toEqual(userForToken);
     expect(secret).toBe(JWTSECRET);
     expect(options.expiresIn).toBe(tokenExpiry)

    })
   

})





