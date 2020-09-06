###Masonry - Templating middleware for embedded javascript templates.   
Install: ```npm install masonry```
***
###masonry(directory):  
Pass a directory of templates. Masonry will read all of the template files into memory.
###res.render('template.ejs', data)  
Method added by the middleware. Renders a template. If a third parameter (callback) is provided the data will be returned rather than sent to the browser. The first param will be an error object, the second will be the rendered html.

```
var app = require('express').createServer()
var masonry = require('masonry')

app.use(masonry(__dirname + '/templates'))

app.get('/:user', function(req, res) {
  res.render('index.ejs', {user: req.params.user})
})

app.get('/return/:user', function(req, res) {
  res.render('index.ejs', {user: req.params.user}, function(err, html){
    if(err) throw new Error(err)
    res.end(html)
  })
})

app.listen(3000)
```
###Deps:
EJS documentation: [https://github.com/visionmedia/ejs](https://github.com/visionmedia/ejs)  
***
###Examples: 
[View the examples](https://github.com/bradleyg/masonry/blob/master/example/app.js)  
***
###Tests  
```
npm test
```  

[![Build Status](https://secure.travis-ci.org/bradleyg/masonry.png)](http://travis-ci.org/bradleyg/masonry)