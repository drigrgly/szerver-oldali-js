/*
 *  If a new note comes in it adds it to the database
 *  Otherwise it updates the existing one
 */
module.exports = function (objectrepository) {
  return function (req, res, next) { 
    //Checking if the note alredy exists in the database, if yes, then update
    //Else insert
    if(typeof req.body.noteBody === 'undefined') {
      return next();
    }

    return res.redirect("/note/edit/"+"majd_id_jon_az_id");
  }
}