const jwt = require('jsonwebtoken');
const userTokenSchema = require('../ModelSchema/userToken');
const asyncHandler = require('express-async-handler');

const generateTokens = asyncHandler(async (user)=>{

    //created a payload
    const payload  = {_id: user.userId, roles: user.roles}

    //The Secret token 
    const SecretToken = jwt.sign(
        payload,
        process.env.JWT_SECRET_TOKEN,
        {expiresIn: "14m"} //when we want the token to expire
    );

    //the Refresh token
    const RefreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_TOKEN,
        {expiresIn: "30d"} //when we want the token to expire
    );

    const userToken = await userTokenSchema.findOne({userId: user._id});  //finding the user by id
    if(userToken) await userTokenSchema.deleteOne();                         //remove the user by id
    await new userTokenSchema({userId: user._id, token: RefreshToken}).save(); //creating a new user
    return Promise.resolve({SecretToken, RefreshToken });                    // resolving it asynchronously
});

module.exports = generateTokens;
