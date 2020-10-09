var express = require('express');
var path = require('path');
var router = express.Router();
var session = require('express-session');

var multer  = require('multer');

// multer setting
const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, 'uploads/goods');
    },
    // file name 중복을 피하기위해 date() 추가.
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

var login = require('../src/login');
var store = require('../src/store');
var cate = require('../src/category');
var goods = require('../src/goods');
var image = require('../src/image');

// 세션 설정
router.use(session({
	secret:'session_secret!',
	resave:false,
  saveUninitialize:false,
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

// 매장 이름 리스트 전송
router.get('/api/getstorenames', (req,res)=>{
  store.getstorenames(req,res);
});

// 매장 정보 전송
router.get('/api/getstore',(req,res)=>{
  store.getstore(req,res);
});

// 매장 삭제
router.delete('/api/store', (req,res)=>{
  store.deletestore(req,res);
})

// 카테고리 정보 저장
router.post('/api/setcategory', (req,res)=>{
  cate.setcategory(req,res);
});

// 카테고리 이름 전송
router.get('/api/getcategoryname', (req,res)=>{
  cate.getcategoryname(req,res);
});

// 카테고리 정보 전송
router.get('/api/getcategory',(req,res)=>{
  cate.getcategory(req,res);
});

// 카테고리 삭제
router.delete('/api/category', (req,res)=>{
  cate.deletecategory(req,res);
})

// 매장정보 세션에 저장
router.post('/api/setstoreSession', (req,res)=>{
  req.session.store_name = req.body.store_name;
  req.session.save();
  console.log("store session saved.");
  res.status(200).send(req.session.store_name);
});

// 상품 등록
router.post('/api/setgoods',(req,res)=>{
  goods.setgoods(req,res);
});

// 상품 명 출력
router.get('/api/getgoodsnames',(req,res)=>{
  goods.getgoodsnames(req,res);
});

// 상품 데이터 전송
router.get('/api/getgoods', (req,res)=>{
  goods.getgoods(req,res);
});

// 상품 삭제
router.delete('/api/goods', (req,res)=>{
  goods.deletegoods(req,res);
});

// image upload test
router.post('/profile', upload.single('image'), function (req, res, next) {
  // req.file 은 `avatar` 라는 필드의 파일 정보입니다.
  // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
  image.saveimage(req,res);
  res.send('Uploaded! : '+req.file);
  console.log(req.file);
});

router.post('/getimage', (req,res)=>{
  image.getimage(req,res);
})




module.exports = router;