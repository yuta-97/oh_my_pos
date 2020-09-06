var app = require('obedient')
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