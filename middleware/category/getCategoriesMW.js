/*
 *  Gets all the categories from the database
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {  
    let dummyCategories = [
      {
        id: 2,
        title: "Teendők",
        bgColor: "#00ee55",
        fgColor: "#111"
      },
      {
        id: 3,
        title: "Munka",
        bgColor: "#ffdd58",
        fgColor: "#fff"
      }
    ];

    //This is the default category that cannot be deleted
    let permanentCategory = {
      id: 0,
      isDefault: true,
      title: "NOTE",
      bgColor: "#ffee55",
      fgColor: "#000"
    }

    dummyCategories.unshift(permanentCategory)
    res.locals.categories = dummyCategories ;
    return next();
  }
}