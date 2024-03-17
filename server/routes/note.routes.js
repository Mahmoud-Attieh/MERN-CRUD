const NoteController = require('../controllers/note.controller');
module.exports = function(app){
    app.get('/api', NoteController.index);
    app.post('/api/notes', NoteController.createNote);
    app.get('/api/notes', NoteController.getAllNotes);
    app.get('/api/notes/:id', NoteController.getNote);
    app.patch('/api/notes/:id', NoteController.updateNote);
    app.delete('/api/notes/:id', NoteController.deleteNote);
}