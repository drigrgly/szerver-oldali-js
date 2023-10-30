/*
*  If a new note comes in it adds it to the database
*  Otherwise it updates the existing one
*/
const requireOption = require("../common/requireOption");
module.exports = function (objectrepository) {
  const NoteModel = requireOption(objectrepository, "NoteModel");
  const CategoryModel = requireOption(objectrepository, "CategoryModel");

  return function (req, res, next) {

    //Checking if the note alredy exists in the database, if yes, then update
    //Else insert

    const { title, category, text, } = req.body;
    let creation_date, modification_date;

    if(req.body.creation_date === undefined) 
      creation_date = Date();
    else 
      creation_date = req.body.creation_date
    modification_date = Date();

    if (title === undefined || title == '' || 
        creation_date === undefined||
        category === undefined) {

      return next();
    }


    if (req.params.note_id === undefined) {
      res.locals.note = new NoteModel();
    }

    console.log(req.body);

    res.locals.note.title = title;
    res.locals.note.creation_date = creation_date;
    res.locals.note.modification_date = modification_date;
    res.locals.note._category = category;
    res.locals.note.text = text;

    res.locals.note.save()
      .then(() => {
        return res.redirect("/note/edit/" + res.locals.note._id);
      })
      .catch(err => {
        return next(err);
      })

  }
}
