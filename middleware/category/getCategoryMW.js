/*
 *  Returns the category with the given ID
 */
const requireOption = require("../common/requireOption");


module.exports = function (objectrepository) {
  const CategoryModel = requireOption(objectrepository ,"CategoryModel");

  return async function (req, res, next) {  
    try {
      let category = await CategoryModel.find({_id: req.params.category_id}).exec();
      res.locals.category = category[0];

      return next();
    }
    catch (err) {
      return next(err);
    }
  }
}