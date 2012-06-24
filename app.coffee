###
Module dependencies.
###

express = require('express')
routes = require('./routes')

app = module.exports = express.createServer()

# Stylus

bootstrap = require('bootstrap-stylus')
stylus = require('stylus')
nib = require('nib')

compile = (str, path) ->
    stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(bootstrap())
        .use(nib())

app.use stylus.middleware(
  src: __dirname + '/public'
  compile: compile
)

# Configuration

app.configure ->
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.bodyParser())
  app.use(express.methodOverride())

  app.use(express.static(__dirname + '/public'))

app.configure 'development', ->
    app.use express.errorHandler(
        dumpExceptions: true
        showStack: true
    )

app.configure 'production', ->
    app.use express.errorHandler()

# Routes

app.get('/', routes.index)

app.listen 8080

console.log "Express server listening in #{app.settings.env} mode"
# console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
