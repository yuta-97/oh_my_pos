
var User = require('../models/user');

async function main(args, res){
    //console.log('received data : \n' + 'ID : ' + args[0] + '\nPW : ' + args[1] + '\nemail : ' + args[2] +'... done.');
    var user = new User({
        id: args[0],
        pw: args[1],
        email: args[2]
    });

    user.save(function(err, user){
        if(err){
            res.json({result:'FAIL'});
            return console.error(err);
        }
        console.dir(user);
        res.json({result:'OK'});
    });
    
}

module.exports = {
    main:main
}