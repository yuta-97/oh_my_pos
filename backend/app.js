var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const models = require('./models');

const PORT = 8080;
//HOST를 localhost로 하니까 response를 보내지 못한다. 왜지?
const HOST = '0.0.0.0';


var sequelize = require('./models/index').sequelize;
var app = express();
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
// test
// app.get('/', (req, res) =>{
//     console.log('yabal success...!');
//     res.json({result: 'OK'});
// });




app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexrouter);



app.get('/api/getuser/:id', (req,res) => {
    models.User.findAll({
        where: {
            user_id: req.params.id
        }
    }).then((result) =>{
        res.status(200).json({result});
    }).catch(function(error){
        console.log(error);
        res.status(500).json({error});
    });
});

app.post('/api/setstore', (req,res)=>{
    models.Store.create({
        store_name: req.body.storename,
        table_num: req.body.tablenum,
        dis_name: req.body.discount.disname,
        dis_rate: req.body.discount.disrate,
        user_id: req.body.user_id
    }).then((result) => {
        console.log("set store success.");
        res.status(200).json({result});
    }).catch(function(error){
        console.log(error);
        res.status(500).json({error});
    })
});

app.post('/api/getstore', (req,res) => {
    models.Store.findAll({
        where:{
            store_name: req.body.storename,
        }
    }).then((result) => {
        console.log("find store success.");
        res.json({result});
    }).catch(function(error){
        console.log(error);
        res.json({error});
    })
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
