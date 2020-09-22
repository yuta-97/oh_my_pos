
var Goods = require('../models/goods');

async function main(param, res){
    
    goods_name = param;

    // Goods.findOne({ goodsname : goods_name }).populate("type", 'categoryname').exec((err, goods) => {
    //     if(err) return res.status(500).json({result: 'FAIL', error: err});
    //     if(!goods) return res.status(404).json({result: 'FAIL', error: 'Goods not found'});
    //     res.json({result: 'OK', goods});
    //   });

    Goods.findOne({goodsname : goods_name}, function(err, goods){
        if(err) return res.status(500).json({result: 'FAIL', error: err});
        if(!goods) return res.status(404).json({result: 'FAIL', error: 'Goods not found'});
        res.status(200).json({result: 'OK', goods});
    });
}

module.exports = {
    main:main
}