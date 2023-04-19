const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [5, "Description must be at least 5 characters"],
        maxlength: [256, "Description cannot be more than 256 characters"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        minlength: [5, "Content must be at least 5 characters"]
    },
    isCompleted: {
        // confer about whether this would be easier as a string type for front end
        type: Boolean,
    }
}, {timestamps: true});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;