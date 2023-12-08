let expect = require("chai").expect;
let delNoteMW = require("../../../../middleware/note/delNoteMW");
const asyncTester = require("../../../asyncTester");
describe("delNote middleware", () => {
  it("If the deletion wasn't successful throw 'Note not found' error", (done) => {
    const NoteModel = {
      deleteOne: () => {
        return new Promise((resolve) => {
            resolve({deletedCount: 0});
        });
      },
    }

    const mw = delNoteMW({
      NoteModel
    });

    const resMock = {
      locals: {}
    };

    mw({
      params: {
        note_id: "10",
      }
    },
      resMock, 
      (err) => {
        asyncTester(done, () => {
          expect(err.toString()).to.be.eql("Error: Note not found");
        })

      })

  });

  it("If the deletion was successful redirect to /notes", (done) => {
    const NoteModel = {
      deleteOne: (p1) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({deletedCount: 0});
          }, 1);
        });
      },
    }

    const mw = delNoteMW({
      NoteModel
    });

    const resMock = {
      locals: {},
      redirect: where => {
        expect(where).to.be.eql("/noftes");
        done();
      }
    };

    mw({
      params: {
        note_id: "10",
      }
    },
      resMock, 
      (err) => {
        asyncTester(done, () => {
          expect(err.toString()).to.be.eql("Error: Note not found");
        })
      })

  })

})
