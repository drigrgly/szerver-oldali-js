// const NoteModel = require("./models/note");
// const CategoryModel = require("./models/category");

// let category = new CategoryModel();
// category.title = "asd";
// category.bgColor = "#000";
// category.fgColor = "#fff";
// category.save()
// .then(() => {
//   let note = new NoteModel();
//   note.title ="Címem";
//   note.creation_date = Date("2001.11.28");
//   note.modification_date = Date("2022.11.30");
//   note._category = category;
//   note.save();
// })


let express = require("express");
let app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));
//routing
require("./route/index")(app);

app.use((err, req, res, next) => {
  res.end("Problem...");
  console.log(err);
});

let server = app.listen(3000, () => {
  console.log("Running on :3000");
});