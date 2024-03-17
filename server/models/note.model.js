const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
    noteTitle: { type: String , required: [true,"Note title must contain 2 characters"], minlength:[2,"Note title must contain at least 2 characters"] },
    noteBody: { type: String , required: [true,"Note Body must contain 2 characters"], maxlength:[25,"Note Body must contain at max 25 characters"] },
    noteValue: { type: Number ,required: [true,"Must be unique number greater than 1"], min:[1,"Note Value must be unique number greater than 1"], max:[10, "Note Value must be between 1 - 10 "]},
}, { timestamps: true });
module.exports.Note = mongoose.model('Note', NoteSchema);
