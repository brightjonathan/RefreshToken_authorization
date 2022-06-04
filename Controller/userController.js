const bcrypt = require('bcrypt'); 
const asyncHandler = require('express-async-handler');
const userSchema = require('../ModelSchema/userSchema'); //ModelSchema
const generateTokens = require('../utility/generateToken')

//@desc      user registration
//@route    POST api/register
//@access    public
const registeruser = asyncHandler(async (req, res) =>{
   
    const {name, email, password} = req.body;
    
    //if the input is empty
    if(!name || !email || !password ){
        res.status(400)
        throw new Error('please enter the input fields')
    };
    
    //checking if the user Exit
    let userExit = await userSchema.findOne({email});
    if(userExit) {
        res.status(400)
        throw new Error('user already Exit')
    };

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    
    //create user
    const user = await userSchema.create({
        name,
        email,
        password: hashedpassword
    });

    if(user){
        res.status(200).json({
           user,
        })
    } else{
        res.status(400)
        throw new Error('invalid user data')
    }

});


//@desc      user login
//@route    POST api/login
//@access    public
const loginuser = asyncHandler(async (req, res) =>{
     
    const {email, password} = req.body;

    //check for user by email
    const user = await userSchema.findOne({email});

    //
    const {SecretToken, RefreshToken } = generateTokens(user);

    //return true if both operand are true or otherwise that is false
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            user,
            SecretToken,
            RefreshToken,
        })
    } else{
        res.status(400)
        throw new Error('invalid credential')
    }

});


module.exports = {
    registeruser,
    loginuser
}