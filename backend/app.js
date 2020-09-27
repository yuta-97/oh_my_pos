var express = require('express');
const mongoose = require('mongoose');

var app = express();
var path = require('path');
const bodyParser = require('body-parser');

app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


// Vue-router & express 연동을위한 모듈.
app.use(require('connect-history-api-fallback')());

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect('mongodb://root:passwd@mongo:27017/admin')
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

var router = express.Router();

var login = require('./src/login');
var regist = require('./src/regist');
var getuser = require('./src/getusers');

var getgoods = require('./src/getgoods');
var setgoods = require('./src/setgoods');

var setstore = require('./src/setstore');
var updatestore = require('./src/updatestore');
var getstore = require('./src/getstore');

var setcategory = require('./src/setcategory');
var updatecategory = require('./src/updatecategory');
var getcategory = require('./src/getcategory');

var indexrouter = require('./routes/index');
// const { options } = require('./routes/index');

const PORT = 8080;
//HOST를 localhost로 하니까 response를 보내지 못한다. 왜지?
const HOST = '0.0.0.0';

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexrouter);

// test
// app.get('/', (req, res) =>{
//     console.log('yabal success...!');
//     res.json({result: 'OK'});
// })


// 회원가입
app.post('/api/regist', (req, res)=>{
    console.log('receive post request!!');

    id = req.body.id;
    pw = req.body.pw;
    email = req.body.email;
    args = [id, pw, email];

    regist.main(args, res)
});


// 로그인
app.post('/api/login', (req, res)=>{
    console.log('receive post request!!');

    id = req.body.id;
    pw = req.body.pw;
    args = [id,pw];

    login.main(args, res);
});

// 회원 검색
app.get('/api/getuser/:id', (req, res)=>{
    console.log('get all users!');

    id = req.params.id;

    getuser.main(id, res);

});

// 상품 등록
app.post('/api/setgoods', (req, res)=>{
    console.log('set goods');
    goodsname = req.body.goodsname;
    type = req.body.type;
    price = req.body.price;
    desc = req.body.desc;

    
    args = [goodsname, type, price, desc];
    console.log(args);
    setgoods.main(args, res);
});

// 상품 검색
app.post('/api/getgoods', (req, res)=>{
    console.log('get goods');
    goodsname = req.body.goodsname;

    getgoods.main(goodsname, res);

});

// 매장 설정
app.post('/api/setstore', (req,res)=>{

    storename = req.body.storename;
    tablenum = req.body.tablenum;
    discount = req.body.discount;

    args = [storename, tablenum, discount];

    setstore.main(args, res);
});

// 매장 업데이트
app.post('/api/updatestore', (req,res)=>{
    storename = req.body.storename;
    tablenum = req.body.tablenum;
    discount = req.body.discount;

    args = [storename, tablenum, discount];

    updatestore.main(args, res);
});

// 매장 검색
app.post('/api/getstore', (req,res)=>{

    storename = req.body.storename;

    getstore.main(storename, res);
});

// 카테고리 등록
app.post('/api/setcategory', (req,res)=>{
    categoryname = req.body.categoryname;
    options = req.body.options;
    // optionname = req.body.optionname;
    // optionprice = req.body.optionprice;

    args = [categoryname, options];

    setcategory.main(args, res);
});

// 카테고리 업데이트
app.post('/api/updatecategory', (req,res)=>{
    categoryname = req.body.categoryname;
    options = req.body.options;

    args = [categoryname, options];

    updatecategory.main(args, res);
})

// 카테고리 검색
app.post('/api/getcategory', (req,res)=>{
    categoryname = req.body.categoryname;

    getcategory.main(categoryname, res);
});








app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);
