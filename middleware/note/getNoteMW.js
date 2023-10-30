/*
 *  Returns the note with the given ID
 */

const requireOption = require("../common/requireOption");


module.exports = function (objectrepository) {
  const NoteModel = requireOption(objectrepository ,"NoteModel");

  return async function (req, res, next) { 
    try {
      let note = await NoteModel.find({_id: req.params.note_id}).exec();
      res.locals.note = note[0];
      return next();
    }
    catch (err) {
      return next(err);
    }
  }
}