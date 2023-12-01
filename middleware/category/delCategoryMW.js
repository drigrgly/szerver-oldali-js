/*
 *  Deletes the category with the given id
 *  Then redirects to the categories page
 */
const requireOption = require("../common/requireOption");


module.exports = function (objectrepository) {
  const CategoryModel = requireOption(objectrepository ,"CategoryModel");
  const NoteModel = requireOption(objectrepository, "NoteModel");

  //Only delete if its not the default category
  return async function (req, res, next) {
    if(req.params.isDefault == true)
      res.redirect("/categories")
     
    let defCateg = await CategoryModel.findOne({isDefault: true})

    //First change the categories for the notes that have the category which will be deleted
    NoteModel.updateMany({_category: req.params.category_id}, {_category: defCateg._id})
    .then(result => {
      
      //Then delete the category
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
    })
  }

}