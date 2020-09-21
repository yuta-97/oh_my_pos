var express = require('express');
const mongoose = require('mongoose');

var app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect('mongodb://root:passwd@mongo:27017/admin')
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));



//var router = express.Router();

var regist = require('./src/regist');
var login = require('./src/login');
var getuser = require('./src/getusers');
var getmenu = require('./src/getmenu');
var setmenu = require('./src/setmenu');
var shopsetting = require('./src/shopsetting');


const PORT = 8080;
//HOST를 localhost로 하니까 response를 보내지 못한다. 왜지?
const HOST = '0.0.0.0';

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

// 메뉴 등록
app.post('/api/setmenu', (req, res)=>{
    console.log('set menu');
    menu = req.body.menu;
    type = req.body.type;
    price = req.body.price;
    desc = req.body.desc;
    args = [menu, price, desc];

    setmenu.main(args, res);
});

// 메뉴 검색
app.post('/api/getmenu', (req, res)=>{
    console.log('get menu');
    menu = req.body.menu;

    getmenu.main(menu, res);

});

app.post('/api/shopsetting', (req,res)=>{

    shopsetting.main(args, res);
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);