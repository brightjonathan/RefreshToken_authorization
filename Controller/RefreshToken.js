const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const userTokenSchema = require('../ModelSchema/userToken');
const verifyRefreshToken = require('../utility/VerifyRefreshToken');


//@desc      user registration
//@route    POST api/access
//@access    public
const accessToken = asyncHandler( async(req, res)=>{
    const {refreshToken} = req.body

    if(!refreshToken ){
        res.status(400)
        throw new Error('please enter a token')
    };

    //verifying the refresh token
    verifyRefreshToken(req.body.refreshToken)
    .then(({tokenDetails})=>{
         const  payload = {_id: tokenDetails._id, roles: tokenDetails.roles};
         const accessToken = jwt.sign(
             payload,
             process.env.JWT_SECRET_TOKEN,
             {expiresIn: "14m"}
         );
         res.status(200).json({
             accessToken,
             message: "Access token created succesfully"
         })
    });

});


//@desc      user registration
//@route    POST api/delete
//@access    public
const DeleteApi = asyncHandler (async (req, res)=>{
     
    if(!refreshToken ){
        res.status(400)
        throw new Error('please enter the a token')
    };

    const userToken = await userTokenSchema.findOne({token: req.body.refreshToken});
    if(!userToken)
    return res.status(200).json('logged out Successfully')
});


module.exports = {
    accessToken,
    DeleteApi
};