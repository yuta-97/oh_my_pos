
var Menu = require('../models/menu');

async function main(param, res){
    
    getmenu = param;

    Menu.findOne({menu: getmenu}, function(err, menu){
        if(err) return res.status(500).json({result: 'FAIL', error: err});
        if(!menu) return res.status(404).json({result: 'FAIL', error: 'Menu not found'});
        res.json({result: 'OK', menu});
    });
}

module.exports = {
    main:main
}