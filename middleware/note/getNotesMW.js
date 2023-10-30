/*
 *  Gets all the notes from the database
 */
const requireOption = require("../common/requireOption");


module.exports = function (objectrepository) {
  const NoteModel = requireOption(objectrepository ,"NoteModel");

  return async function (req, res, next) {  

    try {
      let notes = await NoteModel.find({});
      res.locals.notes = notes;
      return next();
    }
    catch (err) {
      return next(err);
    }
  }
}