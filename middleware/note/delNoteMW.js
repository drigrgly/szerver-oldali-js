/*
 *  Deletes the note with the given id
 *  Then redirects to the notes page
 */
const requireOption = require("../common/requireOption");


module.exports = function (objectrepository) {
  const NoteModel = requireOption(objectrepository, "NoteModel");

  return function (req, res, next) {  
    NoteModel.deleteOne({_id: req.params.note_id})
      .then(result => {
        if (result.deletedCount === 0) {
          const err = new Error("Note not found");
          err.status = 404;
          return Promise.reject(err);
        }
        return res.redirect("/notes");
      })
      .catch(err => {
        return next(err);
      })
  }
}