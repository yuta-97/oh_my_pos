
const models = require('../models');

function setcategory(req, res){

    models.Category.create({
        category_name: req.body.category_name,
        option_name: req.body.option_name,
        option_price: req.body.option_price,
        store_name: req.session.store_name
    }).then((result)=>{
        console.log(result);
        console.log("카테고리 등록 완료!");
        res.status(200).json({result:'OK'});
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });
}

function getcategory(req,res){

    models.Category.findAll({
        where:{
            store_name: req.session.store_name,
        },
        attributes: ['category_name']
    }).then((result)=>{
        console.log("카테고리 검색!");
        var data = JSON.parse(JSON.stringify(result));
        res.status(200).json(data);
    }).catch(function(error){
        console.log(error);
        res.status(500).json({error});
    })
}

module.exports = {
    setcategory,
    getcategory,
}
