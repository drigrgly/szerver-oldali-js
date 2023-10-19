/*
 *  If a new category comes in it adds it to the database
 *  Otherwise it updates the existing one 
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {  
    if(typeof req.body.categTitle === 'undefined') {
      return next();
    }

    return res.redirect("/categories");
  }
}