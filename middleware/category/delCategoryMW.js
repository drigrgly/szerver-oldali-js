/*
 *  Deletes the category with the given id
 *  Then redirects to the categories page
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {  
    console.log(req.body.categoryId);
    if(typeof req.body.categoryId === 'undefined') {
      return next();
    }

    return res.redirect("/categories");
  }
}