/*
 *  Returns the category with the given ID
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {  
    let category = {
      id: 3,
      title: "Munka",
      bgColor: "#ffdd58",
      fgColor: "#fff"
    }

    res.locals.category = category;
    return next();
  }
}