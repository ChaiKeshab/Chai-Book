const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//JWT secret key
const JWT_SECRET = '@myOwnSecretString!'

//Create a User using: POST "/api/auth/createuser". Doesn't require Authentication. Only validation
router.post('/createuser', [
    body('name', 'Name length must be greater than 2').isLength({ min: 2 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })

    // using async await instead of .then
], async (req, res) => {

    // errors? return bad request && errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the user with this email already exist
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry, a user with this email already exists" })
        }

        //await cuz it returns a promise. same with other codes where await is used
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })


        // JWT token
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        //response json view
        res.json({ authToken })
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})


//Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Passowrd cannot be black').exists(),
], async (req, res) => {

    // errors? return bad request && errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passCompare = await bcrypt.compare(password, user.password); //returns a bool. Compairing hash password
        if (!passCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        // user's data
        const payload = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, JWT_SECRET);
        res.json({ authToken })

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }

})


module.exports = router

