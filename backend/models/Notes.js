const mongoose = require('mongoose')
const { Schema } = mongoose

const NotesSchema = new Schema({
    user: {
        //like a foreign key to link user with their correct notes.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' //from User.js model
    },
    title: {
        type: String,
        // required: false,
    },
    description: {
        type: String,
        // required: true,
    },
    tags: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});

//eslint-disable-next-line 
module.exports = mongoose.model('notes', NotesSchema)