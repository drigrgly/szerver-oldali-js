/*
 *  Returns the note with the given ID
 */
module.exports = function (objectrepository) {
  return function (req, res, next) { 
    let note = {
      title: "Nagyon nagyon hosszú cím",
      createDate: "2023.11.28",
      modDate: "2023.12.24",
      categId: 2
    }

    res.locals.note = note;

    return next();
  }
}