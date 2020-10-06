var express = require('express');
var path = require('path');
const models = require('../models');
var router = express.Router();
var session = require('express-session');


var login = require('../src/login');
var store = require('../src/store');
var cate = require('../src/category');

// 세션 설정
router.use(session({
	secret:'session_secret!',
	resave:false,
	saveUninitialize:true
}));

// vue-router 연동
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// 회원 가입
router.post('/api/regist',(req,res)=>{
  login.regist(req,res);
});

// 로그인
router.post('/api/login',(req,res)=>{
  login.login(req,res);
});

// 로그인 되어있는지 확인
router.get('/api/logedin',(req,res)=>{
  login.islogin(req,res);
});

// 로그아웃
router.get('/api/logout',(req)=>{
  req.session.destroy();
  console.log('session deleted!');
});

// 매장 등록
router.post('/api/setstore', (req,res)=>{
  store.setstore(req,res);
});

// 매장 검색
router.get('/api/getstore', (req,res)=>{
  store.getstore(req,res);
});

router.post('/api/setcategory', (req,res)=>{
  cate.setcategory(req,res);
});

router.get('/api/getcategory', (req,res)=>{
  cate.getcategory(req,res);
})





module.exports = router;