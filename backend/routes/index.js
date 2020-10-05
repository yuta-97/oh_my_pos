var express = require('express');
var path = require('path');
const models = require('../models');
var router = express.Router();
var session = require('express-session');

var login = require('../src/login');

router.use(session({
	secret:'session_secret!',
	resave:false,
	saveUninitialize:true
}));

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/api/regist',(req,res)=>{
  console.log('regist rerquest!!');
    models.User.create({
      user_id: req.body.id,
      user_pw: req.body.pw,
      user_email: req.body.email
    }).then(() =>{
        res.status(200).json({result: 'OK'});
    }).catch(function(error){
        console.log(error);
        res.status(500).json({error});
    });
});

router.post('/api/login',(req,res)=>{
  if(!req.session.login){
    models.User.findOne({
      where: {user_id: req.body.id}
    })
      .then(function(user){
          if(user==null || user.dataValues.user_pw!=req.body.pw){
              req.session.login = false;
              req.session.save();
              res.status(500).send(req.session.login);
              console.log('로그인 실패');
          } 
          else{
              req.session.user_id = user.dataValues.user_id;
              req.session.login = true;
              req.session.save();
              res.status(200).send(req.session.login);
              console.log('로그인 성공');
          }
      }).catch(function(error){
          console.log(error);
      });
    console.log('session_setted');
  }
});

// 로그인 되어있는지 확인
router.get('/api/logedin',(req,res)=>{
  if(req.session == null || !req.session.login){
    // 로그인 안됨
    res.send(false);
    console.log('로그인 안됨!!');
  }else{
    // 로그인 되어있음
    res.json({result: 'OK'});
    console.log('이미 로그인 됨!!');
  }
});

router.get('/api/logout',(req,res)=>{
  req.session.destroy();
  console.log('session deleted!');
});


module.exports = router;