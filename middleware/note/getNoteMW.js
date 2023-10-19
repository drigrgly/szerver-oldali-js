/*
 *  Returns the note with the given ID
 */
module.exports = function (objectrepository) {
  return function (req, res, next) { 
    let note = {
        id: 2,
        title: "Rövid cím",
        body: "Ez egy másik jegyzetem",
        createDate: "2023.10.10",
        modDate: "2023.12.12",
        categId: 3
    }

    res.locals.note = note;

    return next();
  }
}