const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Create a User using: POST "/api/auth/createuser". Doesn't require Authentication. Only validation
router.post('/createuser', [
    body('name', 'Custom message on error').isLength({ min: 2 }),
    body('email').isEmail(),
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

        //response json view
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).send("Some Error occured")
    }
})

module.exports = router

/*eslint-disale*/