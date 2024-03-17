const { Note } = require('../models/note.model');
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
    // The method below is new
module.exports.createNote = (request, response) => {
    const { noteTitle, noteBody,noteValue } = request.body;
    Note.create({
        noteTitle,
        noteBody,
        noteValue
    })
        .then(note => response.json(note))
        .catch(err => response.status(400).json(err))
}

module.exports.getAllNotes = (request, response) => {
    Note.find({})
        .then(notes => response.json(notes))
        .catch(err => response.json(err))
}

module.exports.getNote = (request, response) => {
    Note.findOne({_id:request.params.id})
        .then(note => response.json(note))
        .catch(err => response.json(err))
}

module.exports.updateNote = (request, response) => {
    Note.findOneAndUpdate({_id: request.params.id}, request.body, {new:true,runValidators:true})
        .then(updatedNote => response.json(updatedNote))
        .catch(err => response.status(400).json(err))
}

module.exports.deleteNote = (request, response) => {
    Note.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}