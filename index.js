let express = require("express");
let app = express();

app.use(express.static(__dirname + '/public'));

//routing
app.get("/", (req, res, next) => {
  res.redirect("/views/notes.html");
});


let server = app.listen(3000, () => {
  console.log("Running on :3000");
});