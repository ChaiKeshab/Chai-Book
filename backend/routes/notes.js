/*eslint-disable*/
const express = require('express')
const router = express.Router()
const Note = require('../models/Notes')
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required. Logged in means having auth-token which is send in header
router.post('/addnote', fetchUser, [
    body('title', 'Min length required: 1'),
    body('description', 'Min length required: 1').isLength({ min: 1 })
], async (req, res) => {

    try {
        const { title, description, tags } = req.body
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


// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote/:id". Login required. Logged in means having auth-token which is send in header
router.put('/updatenote/:id', fetchUser, [
], async (req, res) => {
    const { title, description, tags } = req.body

    try {
        //Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tags) { newNote.tags = tags };

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //Allow updation only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }

})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote/:id". Login required.
router.delete('/deletenote/:id', fetchUser, [
], async (req, res) => {

    try {
        //Find the note to be deleted and delelte it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //Allow deletetion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router