const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Category = db.model("Category",{
  title: String,
  bgColor: String,
  fgColor: String
});

module.exports = Category;
