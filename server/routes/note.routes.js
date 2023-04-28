const NoteController = require('../controllers/note.controller');

module.exports = app => {
    app.get('/api/notes', NoteController.getAllNotes);
    app.post('/api/notes', NoteController.createNote);
    app.get('/api/notes/:id', NoteController.getOneNote);
    app.patch('/api/notes/:id', NoteController.updateNote);
    app.delete('/api/notes/:id', NoteController.deleteNote);
}