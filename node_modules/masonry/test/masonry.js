var app = require('express').createServer()
var request = require('request')
var should = require('should')
var path = require('path')
var masonry = require('../index.js')

// methods

app.use(masonry(path.join(__dirname, '../example/templates')))

app.get('/missing', function(req, res){
  res.render('missing.ejs', {user: req.params.user})
})

app.get('/return/:user', function(req, res){
  res.render('index.ejs', {user: req.params.user}, function(err, html){
    res.end(html)
  })
})

app.get('/wrong', function(req, res){
  res.render('index.ejs', {})
})

app.get('/wrong2', function(req, res){
  res.render('index.ejs', {}, function(err, html){
    res.end(html)
  })
})

app.get('/:user', function(req, res){
  res.render('index.ejs', {user: req.params.user})
})

app.listen(3000)

// tests

describe("masonry", function () {
  
  describe('res.render()', function(){
    
    it('should return a rendered template, browser send', function(done){
      request('http://localhost:3000/bradley', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(200)
        body.should.equal('<h1>bradley</h1>')
        done()
      })      
    })
    
    it('should return a rendered template, callback method', function(done){
      request('http://localhost:3000/return/bradley', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(200)
        body.should.equal('<h1>bradley</h1>')
        done()
      })      
    })
    
    it('should error if correct params were not passed to the template, browser send', function(done){
      request('http://localhost:3000/wrong', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(500)
        var msg = (body.indexOf('Internal server error') !== -1)
        msg.should.equal(true)
        done()
      })      
    })
    
    it('should error if correct params were not passed to the template, callback method', function(done){
      request('http://localhost:3000/wrong2', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(200)
        var msg = (body.indexOf('Internal server error') !== -1)
        msg.should.equal(true)
        done()
      })      
    })
    
    it('should return an error if the template does not exist', function(done){
      request('http://localhost:3000/missing', function(err, res, body){
        should.not.exist(err)
        should.exist(res)
        res.statusCode.should.equal(500)
        var msg = (body.indexOf('Internal server error') !== -1)
        msg.should.equal(true)
        done()
      })      
    })

  }) 
 
})