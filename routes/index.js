var github = require("github");

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Node.js Weekly' })
};
