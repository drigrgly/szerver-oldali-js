let expect = require("chai").expect;
let defaultCategoryMW = require("../../../../middleware/category/defaultCategoryMW");
let asyncTester = require("../../../asyncTester");
describe("defaultCategory middleware ", () => {
  it("If the default category is not missing, we just continue", (done) => {
    //We use the asyncTester, so mocha can catch the exceptions
    //an async function throws
    const CategoryModel = {
      find: () => {
        return CategoryModel;
      },
  
      exec: () => {
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
      })
    })
  })


  it("If the default category is missing, we add it to the list", (done) => {
      const helperModel = {
        exec: async () => {
          return []
        }
      }

      class CategoryModel {
        constructor() {

        }

        static find() {
          return helperModel;
        }
    
        exec() {
          return [];
        }

        save() {
          return new Promise((resolve) => {
              resolve();
          });
        }
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
});