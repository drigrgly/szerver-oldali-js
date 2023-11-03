/*
 *  Deletes the category with the given id
 *  Then redirects to the categories page
 */
const requireOption = require("../common/requireOption");


module.exports = function (objectrepository) {
  const CategoryModel = requireOption(objectrepository ,"CategoryModel");

  return function (req, res, next) {  
    //Only delete if its not the default category
    CategoryModel.deleteOne({ $and: [{_id: req.params.category_id}, {$or: [{isDefault: false}, {isDefault: {$exists: false}}]}] } )
      .then(result => {
        if (result.deletedCount === 0) {
          const err = new Error('Category not found');
          err.status = 404;
          console.log(err);
        }
        return res.redirect("/categories");
      })
      .catch(err => {
        return next(err);
      })
  }
}