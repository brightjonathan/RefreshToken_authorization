const express = require('express');
const router = express.Router();

//destructing the usercontroller
const {
   registeruser,
   loginuser
} = require('../Controller/userController');

const {
   accessToken, 
   DeleteApi
} = require('../Controller/RefreshToken');

//all router
router.post('/register', registeruser);
router.post('/login', loginuser);
router.post('/access', accessToken);
router.delete('/delete', DeleteApi);

module.exports= router;