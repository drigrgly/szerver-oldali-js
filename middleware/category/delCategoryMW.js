/*
 *  Deletes the category with the given id
 *  Then redirects to the categories page
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {  
    if(typeof res.locals.category == 'undefined') {
      return next();
    }

    return res.redirect("/categories");
  }
}