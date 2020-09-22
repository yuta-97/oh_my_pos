const Store = require('../models/store');

async function main(param, res){

    store_name = param;

    Store.findOne({name: store_name}, function(err, store){
        if(err) return res.status(500).json({result: 'FAIL', error: err});
        if(!store) return res.status(404).json({result: 'FAIL', error: 'Store not found'});
        res.status(200).json({store});
    });

}

module.exports = {
    main:main
}