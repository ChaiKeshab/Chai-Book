/*eslint-disable*/
const express = require('express')
const router = express.Router()
const Note = require('../models/Notes')
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Notes using: GET "/api/auth/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required. Logged in means having auth-token which is send in header
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 1 }),
    body('description', 'Enter a valid email').isLength({ min: 1 })
], async (req, res) => {

    try {
        const { title, description, tags, date } = req.body
        // errors? return bad request && errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tags, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router