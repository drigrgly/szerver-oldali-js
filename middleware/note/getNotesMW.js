/*
 *  Gets all the notes from the database
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {  

    let dummyNotes = [
      {
        id: 1,
        title: "Nagyon nagyon hosszú cím",
        body: "Ez az én jegyzetem",
        createDate: "2023.11.28",
        modDate: "2023.12.24",
        categId: 2
      },
      {
        id: 2,
        title: "Rövid cím",
        body: "Ez egy másik jegyzetem",
        createDate: "2023.10.10",
        modDate: "2023.12.12",
        categId: 3
      },
    ];

    res.locals.notes = dummyNotes;

    return next();
  }
}