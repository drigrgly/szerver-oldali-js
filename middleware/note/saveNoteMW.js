/*
 *  If a new note comes in it adds it to the database
 *  Otherwise it updates the existing one
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {  
    return next();
  }
}