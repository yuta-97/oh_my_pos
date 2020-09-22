const Store = require('../models/store');

async function main(args, res){

    var store = new Store({
        name: args[0],
        tablenum: args[1],
        discount: args[2]
    });

    store.save(function(err, store){
        if(err){
            res.json({result:'FAIL'});
            return console.error(err);
        }
        console.dir(store);
        res.json({result:'OK', store/* 배포 후 삭제 */});
    });

}

module.exports = {
    main:main
}