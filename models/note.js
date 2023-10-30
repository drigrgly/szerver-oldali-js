const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Note = db.model("Note",{
  title: String,
  creation_date: Date,
  modification_date: Date,
  text: String,
  _category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }
});

module.exports = Note;