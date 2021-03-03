const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const bcryptjs = require('bcryptjs');

// Validation
const Joi = require('@hapi/joi');


router.post('/register', async (req, res)=>{
    // validate before register
    const {error} = registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    // Checking if the account is existed
    const usernameExist = await User.findOne({username: req.body.username});

    if(usernameExist) return res.status(400).send('Username already exists');

    // Hash passwords
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password,salt);


    // create account
    const user = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }
    catch(err){
        res.json({message: err});
    }
});

router.post('/login', async (req, res)=>{
    // validate before register
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // Check username
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send('Username is not found');

    // Check password
    const validPass = await bcryptjs.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports=router;