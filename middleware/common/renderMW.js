/*
 *  Using the template engine to render the pages
 */
module.exports = function (objectrepository, viewName) {
  return function (req, res, next) {  
    res.render(viewName);
  }
}
