/*
 *  Checks if the default category is in the database, if not it adds it
 *  Then it appends to the category list
 */
const requireOption = require("../common/requireOption");

module.exports = function (objectrepository) {
  const CategoryModel = requireOption(objectrepository ,"CategoryModel");

  return async function (req, res, next) {  
    //This is the default category that cannot be deleted
    try {
      let category = await CategoryModel.find({isDefault: true}).exec();

      //If we have a default category in the database we append it to the list
      if(category.length != 0) {
        return next();
      } 

      //Else we add it
      let perm = new CategoryModel();
      perm.isDefault = true;
      perm.title = "NOTE";
      perm.bgColor = "#ffee55";
      perm.fgColor = "#000";

      perm.save()
        .then(() => {
          res.locals.categories.unshift(perm);

          return next();
        })
        .catch(err => {
          return next(err);
        });
    }
    catch (err) {
      return next(err);
    }

  }
}