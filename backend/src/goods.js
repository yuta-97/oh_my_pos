const models = require('../models');
 
function setgoods(req,res){
    models.Goods.create({
        goods_name: req.body.goods_name,
        price: req.body.price,
        desc: req.body.desc,
        category_name: req.body.type,
        store_name: req.session.store_name
    }).then((result) => {
        console.log("set Goods success.");
        res.status(200).json({result});
    }).catch(function(error){
        console.log(error);
        res.status(500).json({error});
    });
}

function getgoodsnames(req,res){
    models.Goods.findAll({
        where:{
            store_name: req.session.store_name
        },
        attributes: ['goods_name']
    }).then((result) => {
        console.log("get Goodsnames success.");
        var data = JSON.parse(JSON.stringify(result));
        console.log(data);
        res.json(data);
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });
}

function getgoods (req, res){
    
    models.Goods.findAll({
        where:{
            store_name: req.session.store_name
        },
        attributes: ['goods_name', 'price', 'desc', 'category_name']
    }).then((result) => {
        console.log("get Goods data success.");
        var data = JSON.parse(JSON.stringify(result));
        console.log(data);
        res.json(data);
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });
}

function deletegoods(req,res){
    models.Goods.destroy({
        where:{
            goods_name: req.body.goods_names
        },
    }).then((result)=>{
        console.log("delete goods.");
        res.json(result);
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });
}
 

module.exports = {
    setgoods,
    getgoodsnames,
    getgoods,
    deletegoods
}