const Store = require('../models/store');

async function main(args, res){

    
    Store.findOneAndUpdate({name: args[0]}, {$push:{ discount: args[2] }}, function(err, doc){
        if(err){
            res.status(500).json({result:'FAIL'});
            return console.error(err);
        }
        if(doc){
            console.log(doc);
            res.status(200).json({result:'UPDATE OK', doc});
        }
    });
}

module.exports = {
    main:main
}