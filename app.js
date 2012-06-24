
/*
Module dependencies.
*/

(function() {
  var app, bootstrap, compile, express, nib, routes, stylus;

  express = require('express');

  routes = require('./routes');

  app = module.exports = express.createServer();

  bootstrap = require('bootstrap-stylus');

  stylus = require('stylus');

  nib = require('nib');

  compile = function(str, path) {
    return stylus(str).set('filename', path).set('compress', true).use(bootstrap()).use(nib());
  };

  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
  }));

  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    return app.use(express.static(__dirname + '/public'));
  });

  app.configure('development', function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  app.configure('production', function() {
    return app.use(express.errorHandler());
  });

  app.get('/', routes.index);

  app.listen(8080);

  console.log("Express server listening in " + app.settings.env + " mode");

}).call(this);
