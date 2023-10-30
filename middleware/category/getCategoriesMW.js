/*
 *  Gets all the categories from the database
 */
const requireOption = require("../common/requireOption");

module.exports = function (objectrepository) {
  const CategoryModel = requireOption(objectrepository ,"CategoryModel");

  return async function (req, res, next) {  
    try {
      let categories = await CategoryModel.find({});
      res.locals.categories = categories;
      return next();
    }
    catch (err) {
      return next(err);
    }

    //This is the default category that cannot be deleted
    let permanentCategory = {
      id: 0,
      isDefault: true,
      title: "NOTE",
      bgColor: "#ffee55",
      fgColor: "#000"
    }

  }
}