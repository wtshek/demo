const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
    title: String,
    date: String,
    note: String,
})
mongoose.model("note", noteSchema)