let express = require("express");
let app = express();

app.use(express.static('public'));

// app.get("/", (req, res, next) => {
//   res.redirect("/views/notes.html");
// });

//routing
require("./routing/index")(app);

let server = app.listen(3000, () => {
  console.log("Running on :3000");
});