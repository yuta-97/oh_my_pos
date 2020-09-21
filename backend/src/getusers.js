const User = require('../models/user');

async function main(id, res){
    //console.log('received data : \n' + 'ID : ' + args[0] + '\nPW : ' + args[1] + '\nemail : ' + args[2] +'... done.');

    // User.findAll();
    // res.send('success');
    user = id;

    User.findOne({id: user}, function(err, users){
        if(err) return res.status(500).json({result: 'FAIL', error: err});
        if(!users) return res.status(404).json({result: 'FAIL', error: 'User not found'});
        res.json({result: 'OK', users});
    })
}

module.exports = {
    main:main
}