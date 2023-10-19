/*
 *  Deletes the note with the given id
 *  Then redirects to the notes page
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {  
    if(typeof res.locals.note === 'undefined') {
      return next();
    }
    
    return res.redirect("/notes");
  }
}