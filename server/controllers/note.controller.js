const Note = require('../models/note.model');

module.exports = {
    createNote: (req, res) => {
        Note.create(req.body)
            .then(newNote => res.json(newNote))
            .catch(err => res.status(400).json(err))
    },
    getAllNotes: (req, res) => {
        Note.find({}).sort({date: -1, createdAt: -1}) // sort by note date then created at timestamp
            .then(allNotes => res.json(allNotes))
            .catch(err => res.status(400).json(err))
    },
    getOneNote: (req, res) => {
        Note.findById(req.params.id)
            .then(note => res.json(note))
            .catch(err => res.status(400).json(err))
    },
    updateNote: (req, res) => {
        Note.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
            .then(updatedNote => res.json(updatedNote))
            .catch(err => res.status(400).json(err))
    },
    deleteNote: (req, res) => {
        Note.findByIdAndDelete(req.params.id)
            .then(deletedNote => res.json({
                message: "Note successfully deleted",
                deletedNote: deletedNote
            }))
            .catch(err => res.status(400).json(err))
    }
}