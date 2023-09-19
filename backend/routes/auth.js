/*eslint-disable*/
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

//Create a User using: POST "/api/auth/". Doesn't require Authentication
router.post('/', [
    body('name', 'Custom message on error').isLength({ min: 2 }),
    body('email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
        .catch(error => console.log(error))
        res.json({error_btch: 'Enter a unique value for emaiil'})
})

module.exports = router