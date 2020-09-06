var ejs = require('ejs')
var fs = require('fs')

var compiled = []

var render = function(template, data, cb) {
  var error = null
  data = data || {}
  
  try {
    var output = compiled[template](data)
  }
  catch(err) {
    output = '<h1>Internal server error</h1><code>' + err + '</code>'
    error = err
  }
  
  if(typeof cb === 'function') {
    return cb(error, output)
  }
  
  if(error) {
    this.statusCode = 500
    this.setHeader('Content-Type', 'text/html')
  }
  
  this.end(output)
}

module.exports = function(dir) {
  if( ! dir) throw new Error('no template directory defined')
  
  var templates = fs.readdirSync(dir)

  templates.forEach(function(t){
    var html = fs.readFileSync(dir + '/' + t).toString()
    compiled[t] = ejs.compile(html)
  })

  return function(req, res, next) {
    res.render = render
    next()
  }
}