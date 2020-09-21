
var Menu = require('../models/menu');

async function main(args, res){
    //console.log('received data : \n' + 'ID : ' + args[0] + '\nPW : ' + args[1] + '\nemail : ' + args[2] +'... done.');
    var menu = new Menu({
        menu: args[0],
        price: args[1],
        desc: args[2]
    });

    menu.save(function(err, menu){
        if(err){
            res.json({result:'FAIL'});
            return console.error(err);
        }
        console.dir(menu);
        res.json({result:'OK'});
    });
    
}

module.exports = {
    main:main
}