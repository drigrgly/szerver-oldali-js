/*
 *  If a new category comes in it adds it to the database
 *  Otherwise it updates the existing one 
 */
const requireOption = require("../common/requireOption");


module.exports = function (objectrepository) {
  const CategoryModel = requireOption(objectrepository, "CategoryModel");

  return function (req, res, next) {
    const { title, bgColor, fgColor, isDefault, needsChange } = req.body;

    //If we closed the modal instead of saving it don't change anything
    if(needsChange !== undefined && needsChange === "false") return res.redirect("/categories");
 

    if (title === undefined || bgColor === undefined || fgColor === undefined) {
      return next();
    }

    if (res.locals.category === undefined) {
      res.locals.category = new CategoryModel();
      res.locals.category.isDefault = false;
  } else res.locals.category.isDefault = isDefault;

    res.locals.category.title = title;
    res.locals.category.bgColor = bgColor;
    res.locals.category.fgColor = fgColor;

    res.locals.category.save()
      .then(() => {
        return res.redirect("/categories");
      })
      .catch(err => {
        return next(err);
      })

  }
}