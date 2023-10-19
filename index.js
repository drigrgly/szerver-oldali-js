let express = require("express");
let app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));
//routing
require("./route/index")(app);


let server = app.listen(3000, () => {
  console.log("Running on :3000");
});