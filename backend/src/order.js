const models = require('../models');

function addorder(req,res){
    models.Order.create({
        store_name: req.body.store_name,
        table_num : req.body.table_num,
        goods_name: req.body.goods_name,
        count: req.body.count,
        price: req.body.price,
        sum_price: req.body.sum_price,
    }).then(function(order){
        console.log(order.dataValues.id);

        // option 갯수만큼 option 테이블에 저장.
        if(req.body.options!=null){
            for(var i=0; i<req.body.options.length;i++){
                models.Option.create({
                    order_id: order.dataValues.id,
                    option_name: req.body.options[i].option_name,
                    option_price: req.body.options[i].option_price,
                }).then(()=>{
                    console.log("save order done..");
                }).catch(function(error){
                    console.log(error);
                    res.send(false);
                });
            }
        }
        res.send(true);

    }).catch(function(error){
        console.log(error);
        res.send(false);
    });
    
    
}

function getorder(req,res){
    models.Order.findAll({
        include:[{
            model: models.Option,
            attributes: ['option_name', 'option_price']
        }],
        where:{
            store_name: req.body.store_name,
        },
        attributes:['id','table_num', 'goods_name', 'count','price','sum_price']
    }).then((result)=>{
        console.log("get order..");
        var data = JSON.parse(JSON.stringify(result));
        console.log(data);
        res.json(data);
    }).catch(function(error){
        console.log(error);
        res.send(error);
    });
}

function deleteorder(req,res){
    models.Order.destroy({
        where:{
            id: req.body.id
        }
    }).then((result)=>{
        console.log(result);
        res.send(true);
    }).catch(function(error){
        console.log(error);
        res.send(false);
    });
}


module.exports={
    addorder,
    getorder,
    deleteorder,
}