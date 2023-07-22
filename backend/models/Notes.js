//eslint-disable-next-line 
const mongoose = require('mongoose')

//eslint-disable-next-line 
const NotesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
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