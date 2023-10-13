const renderMW = require("../middleware/common/renderMW");
const getCategoriesMW = require("../middleware/category/getCategoriesMW");
const getCategoryMW = require("../middleware/category/getCategoryMW");
const saveCategoryMW = require("../middleware/category/saveCategoryMW");
const delCategoryMW = require("../middleware/category/delCategoryMW");
const getNotesMW = require("../middleware/note/getNotesMW");
const getNoteMW = require("../middleware/note/getNoteMW");
const saveNoteMW = require("../middleware/note/saveNoteMW");
const delNoteMW = require("../middleware/note/delNoteMW");

module.exports = function (app) {
  const objRepo = {};

  app.get("/", 
    getCategoriesMW(objRepo),
    getNotesMW(objRepo),
    renderMW(objRepo, "notes")
  );

  app.get("/note/delete/:note_id",
    getNoteMW(objRepo),
    delNoteMW(objRepo)
  );

  app.use("/note/new",
    getCategoriesMW(objRepo),
    saveNoteMW(objRepo),
    renderMW(objRepo, "note_edit")
  );

  app.use("/note/edit/:note_id", 
    getCategoriesMW(objRepo),
    getNoteMW(objRepo),
    saveNoteMW(objRepo),
    renderMW(objRepo, "note_edit")
  );

  app.get("/categories",
    getCategoriesMW(objRepo),
    renderMW(objRepo, "categories")
  );

  app.post("/category/new", 
    saveCategoryMW(objRepo)
  );

  app.use("/category/edit/:category_id",
    getCategoriesMW(objRepo),
    getCategoryMW(objRepo),
    saveCategoryMW(objRepo),
    renderMW(objRepo, "categories")
  );

  app.get("/categories/delete/:category_id",
    getCategoryMW(objRepo),
    delCategoryMW(objRepo)
  );

};