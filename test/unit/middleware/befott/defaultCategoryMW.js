let expect = require("chai").expect;
let defaultCategoryMW = require("../../../../middleware/category/defaultCategoryMW");
const getCategoryMW = require("../../../../middleware/category/getCategoryMW");
let asyncTester = require("../../../asyncTester");
describe("defaultCategory middleware ", () => {
  it("If the default category is not missing, we just continue", (done) => {
    //We need the setTimeout because we are testing async functions, and without them
    //The error that a failed expect throws falls beyond the scope of our function
    //With a settimeout we can catch it inside the "it"
    setTimeout(() => {
      const CategoryModel = {
        find: (p1) => {
          return CategoryModel;
        },
    
        exec: async () => {
          return [{CategoryModel}]
        }
      }

      const mw = defaultCategoryMW({
        CategoryModel
      });

      const resMock = {
        locals: {}
      };
  
      mw({},
        resMock, 
        () => {
          //If the category already existed we shouldn't see a change in the locals
          asyncTester(done, () => {
            expect(resMock.locals = {})
          });
        })
    })
  }, 100);
  // /settimeout


  it("If the default category is missing, we add it to the list", (done) => {
    //We need the setTimeout because we are testing async functions, and without them
    //The error that a failed expect throws falls beyond the scope of our function
    //With a settimeout we can catch it inside the "it"
    setTimeout(() => {

      const helperModel = {
        exec: async () => {
          return []
        }
      }

      class CategoryModel {
        constructor() {

        }

        static find(p1) {
          return helperModel;
        }
    
        exec() {
          return [];
        }

        save() {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve("foo");
            }, 300);
          });
        }
      }

      const CategoryConstructor = () => {
        return CategoryModel;
      }

      CategoryModel.constructor = () => {}
      const mw = defaultCategoryMW({
        CategoryModel: CategoryModel
      });

      const resMock = {
        locals: {
          categories: []
        }
      };
  
      mw({},
        resMock, 
        () => {
          asyncTester(done, () => {
            expect(resMock.locals.categories).to.be.eql([{bgColor: "#ffee55",fgColor: "#000",isDefault: true,title: "NOTE"}])
          });
        })
    })
  }, 100);
  // /settimeout
});