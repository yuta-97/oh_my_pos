var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = 8080;
//HOST를 localhost로 하니까 response를 보내지 못한다. 왜지?
const HOST = '0.0.0.0';
var sequelize = require('./models/index').sequelize;
var app = express();

// DB 연결
sequelize.sync().then((res)=>{
    console.log("DB connect success!!");
}).catch(function(error){
    console.log(error);
});

app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(cookieParser());

// Vue-router & express 연동을위한 모듈.
app.use(require('connect-history-api-fallback')());

var indexrouter = require('./routes/index');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexrouter);


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
