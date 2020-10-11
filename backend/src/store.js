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
            store_name: req.session.store_name
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

function updatestorename(req,res){
    models.Store.update({store_name: req.body.store_name}, {where: {store_name: req.session.store_name}})
    .then(() => {
        // res.send(true);
    })
    .catch(() => {
        res.send(false);
    });
    models.Category.update({store_name: req.body.store_name}, {where: {store_name: req.session.store_name}})
    .then(() => {
        // res.send(true);
    })
    .catch(() => {
        res.send(false);
    });
    models.Goods.update({store_name: req.body.store_name}, {where: {store_name: req.session.store_name}})
    .then(() => {
        res.send(true);
    })
    .catch(() => {
        res.send(false);
    });
}


function deletestore(req,res){
    models.Store.destroy({
        where:{
            category_name: req.body.category_name
        },
    }).then(()=>{
        console.log("delete categorys.");
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });

    models.Category.destroy({
        where:{
            category_name: req.body.category_name
        },
    }).then(()=>{
        console.log("delete Category cascade..");
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });

    models.Goods.destroy({
        where:{
            category_name: req.body.category_name
        },
    }).then((result)=>{
        console.log("delete Goods cascade...");
        res.json(result);
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });

}


module.exports = {
    setstore,
    getstore,
    getstorebyID,
    getstorenames,
    updatestorename,
    deletestore,
}