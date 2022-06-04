const userTokenSchema = require('../ModelSchema/userToken');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); 

//verifing refresh token
const verifyRefreshToken = asyncHandler( (refreshToken)=>{
    const prevateKey = process.env.JWT_REFRESH_TOKEN
   return new Promise((resolve, reject)=>{
        userTokenSchema.findOne({token: refreshToken}, (err, doc)=> {
            if(!doc)
             return reject({error: true, message: "invalide refresh token"});

             jwt.verify(refreshToken, prevateKey, (err, tokenDetails)=>{
                   if(err)
                   return reject({error: true, message: "invalid refresh token"});
                   resolve({
                       tokenDetails,
                       error: false,
                       message: "Valid refresh token",
                   })
             })
        });
    })
});

module.exports = verifyRefreshToken;