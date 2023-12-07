//When an async function fails the error it creates is beyonde the scope of it
//So when testing an async function in order to catch when the assertion/expect fails
//We wrap it in a setTimeout -> try catch block

module.exports = (done, func) => {
  try {
    func();
    done();
  } catch(e) {
    done(e);
  }
}