var User = require('../models/user');

async function main(args, res){

    User.findOne( {$and: [{id: args[0]}, {pw: args[1]} ] }, function(err, users){
        if(err) return res.status(500).json({result: 'FAIL', error: err});
        if(!users){
            return res.status(404).json({result: 'FAIL', error: 'User not found'});
        }
        else{
            res.json({result: 'OK', users});
        }
    })
}

module.exports = {
    main:main
}