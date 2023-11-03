const renderMW = require("../middleware/common/renderMW");
const getCategoriesMW = require("../middleware/category/getCategoriesMW");
const getCategoryMW = require("../middleware/category/getCategoryMW");
const saveCategoryMW = require("../middleware/category/saveCategoryMW");
const delCategoryMW = require("../middleware/category/delCategoryMW");
const getNotesMW = require("../middleware/note/getNotesMW");
const getNoteMW = require("../middleware/note/getNoteMW");
const saveNoteMW = require("../middleware/note/saveNoteMW");
const delNoteMW = require("../middleware/note/delNoteMW");

const NoteModel = require("../models/note");
const CategoryModel = require("../models/category");
const defaultCategoryMW = require("../middleware/category/defaultCategoryMW");

module.exports = function (app) {
  const objRepo = {
    NoteModel: NoteModel,
    CategoryModel: CategoryModel
  };

  app.get("/note/delete/:note_id",
    getNoteMW(objRepo),
    delNoteMW(objRepo)
  );

  app.use("/note/new",
    getCategoriesMW(objRepo),
    defaultCategoryMW(objRepo),
    saveNoteMW(objRepo),
    renderMW(objRepo, "note_edit")
  );

  app.use("/note/edit/:note_id", 
    getCategoriesMW(objRepo),
    defaultCategoryMW(objRepo),
    getNoteMW(objRepo),
    saveNoteMW(objRepo),
    renderMW(objRepo, "note_edit")
  );

  app.use("/categories",
    getCategoriesMW(objRepo),
    defaultCategoryMW(objRepo),
    renderMW(objRepo, "categories")
  );

  app.post("/category/new",
    saveCategoryMW(objRepo)
  );

  app.use("/category/edit/:category_id",
    getCategoriesMW(objRepo),
    defaultCategoryMW(objRepo),
    getCategoryMW(objRepo),
    saveCategoryMW(objRepo),
    renderMW(objRepo, "categories")
  );

  app.get("/category/delete/:category_id",
    getCategoryMW(objRepo),
    delCategoryMW(objRepo)
  );

  app.get(['/','/notes'], 
    getCategoriesMW(objRepo),
    defaultCategoryMW(objRepo),
    getNotesMW(objRepo),
    renderMW(objRepo, "notes.ejs")
  );
};