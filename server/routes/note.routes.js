const NoteController = require('../controllers/note.controller');

module.exports = app => {
    app.get('/api/notes', NoteController.getAllNotes); //tested on Postman
    app.post('/api/notes', NoteController.createNote); //tested on Postman
    app.get('/api/notes/:id', NoteController.getOneNote); //tested on Postman
    app.put('/api/notes/:id', NoteController.updateNote); //tested on Postman
    app.delete('/api/notes/:id', NoteController.deleteNote); //tested on Postman
}