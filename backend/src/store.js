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
            user_id: req.session.user_id
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
 

module.exports = {
    setstore,
    getstore,
}