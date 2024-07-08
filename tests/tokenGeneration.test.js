require('dotenv').config()
const jwt = require('jsonwebtoken')



//Mock the Jwt.sign method

jest.mock('jsonwebtoken', ()=> ({sign:jest.fn()}))

describe('Token Generation', ()=> {
    const JWTSECRET = 'iyanu3250';
    const userForToken = {
        email:'test@gmail.com',
        userId: 'uniqueUserId'
    } 
    beforeAll(()=> {
        process.env.JWTSECRET =  JWTSECRET
    })
    afterAll(()=>{
        jest.resetAllMocks()
    })

    it('should givee correct user detail from the token and token should expire at the specified time', async() => {
        const tokenExpiry = 60 * 60
    
    //Mocking jwt..sign
        jwt.sign.mockImplementation((payload, secret, options)=>{
            return 'mockedToken'
        })
    //call thee function that generate the token
    const token = jwt.sign(userForToken, JWTSECRET, {expiresIn: tokenExpiry})

     // verify the token
     const [payload, secret, options] = jwt.sign.mock.calls[0]
     expect(payload).toEqual(userForToken);
     expect(secret).toBe(JWTSECRET);
     expect(options.expiresIn).toBe(tokenExpiry)

    })
   

})





