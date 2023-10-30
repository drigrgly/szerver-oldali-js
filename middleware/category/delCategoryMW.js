/*
 *  Deletes the category with the given id
 *  Then redirects to the categories page
 */
const requireOption = require("../common/requireOption");


module.exports = function (objectrepository) {
  const CategoryModel = requireOption(objectrepository ,"CategoryModel");

  return function (req, res, next) {  
    CategoryModel.deleteOne({_id: req.params.category_id})
      .then(result => {
        if (result.deletedCount === 0) {
          const err = new('Category not found');
          err.status = 404;
          return Promise.reject(err);
        }
        return res.redirect("/categories");
      })
      .catch(err => {
        return next(err);
      })
  }
}