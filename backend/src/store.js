const models = require('../models');
 
function setstore(req,res){
    models.Store.create({
        store_name: req.body.storename,
        table_num: req.body.tablenum,
        dis_name: req.body.discount.disname,
        dis_rate: req.body.discount.disrate,
        user_id: req.session.user_id
    }).then((result) => {
        console.log("set store success.");
        // 현재 매장정보 수정.
        req.session.store_name = req.body.store_name;
        req.session.table_num = req.body.table_num;
        req.session.save();
        res.status(200).json({result});
    }).catch(function(error){
        console.log(error);
        res.status(500).json({error});
    });
}

function getstore(req,res){
    models.Store.findAll({
        where:{
            store_name: req.body.store_name
        }
    }).then((result) => {
        console.log("find store success.");
        var data = JSON.parse(JSON.stringify(result));
        res.json(data);
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });
}
function getstorebyID(req,res){
    models.Store.findAll({
        where:{
            user_id: req.session.user_id
        }
    }).then((result) => {
        console.log("find store by ID success.");
        var data = JSON.parse(JSON.stringify(result));
        res.json(data);
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });
}
function gettablenum(req,res){
    models.Store.findOne({
        where:{
            store_name: req.body.store_name
        },
        attributes: ['table_num']
    }).then((result)=>{
        var data = JSON.parse(JSON.stringify(result));
        res.json(data);
    }).catch(function(error){
        console.log(error);
        res.json({error});
    })
}


function getstorenames(req,res){
    models.Store.findAll({
        where:{
            user_id: req.session.user_id
        },
        attributes: [models.sequelize.fn('DISTINCT', models.sequelize.col('store_name')), 'store_name']
    }).then((result) => {
        console.log("find storenames success.");
        var data = JSON.parse(JSON.stringify(result));
        res.json(data);
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });
}

function updatestore(req,res){
    models.Store.update({
        store_name: req.body.store_name,
        table_num: req.body.table_num,
        dis_name: req.body.dis_name,
        dis_rate: req.body.dis_rate}, 
        {where: 
            {store_name: req.body.cur_store_name,
            dis_name: req.body.cur_dis_name}
    })
    .then((result) => {
        console.log(result);
    })
    .catch(function(error){
        console.log(error);
        res.send(false);
    });

    models.Category.update({store_name: req.body.store_name}, {where: {store_name: req.session.store_name}})
    .then((result) => {
        console.log(result);
    })
    .catch(function(error){
        console.log(error);
        res.send(false);
    });


    models.Goods.update({store_name: req.body.store_name}, {where: {store_name: req.session.store_name}})
    .then((result) => {
        console.log(result);
        res.send(true);
    })
    .catch(function(error){
        console.log(error);
        res.send(false);
    });

}


function deletestore(req,res){
    models.Store.destroy({
        where:{
            store_name: req.body.store_name
        },
    }).then(()=>{
        console.log("delete stores.");
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });

    models.Category.destroy({
        where:{
            store_name: req.body.store_name
        },
    }).then(()=>{
        console.log("delete Category cascade..");
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });

    models.Goods.destroy({
        where:{
            store_name: req.body.store_name
        },
    }).then((result)=>{
        console.log("delete Goods cascade...");
        res.send(true);
    }).catch(function(error){
        console.log(error);
        res.send(false);
    });

}


module.exports = {
    setstore,
    getstore,
    getstorebyID,
    getstorenames,
    updatestore,
    deletestore,
    gettablenum,
}