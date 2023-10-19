let express = require("express");
let app = express();
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/static'));
//routing
require("./route/index")(app);


let server = app.listen(3000, () => {
  console.log("Running on :3000");
});