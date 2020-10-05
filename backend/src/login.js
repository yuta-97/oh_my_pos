var models = require('../models');
 
function login(id,pw,req,res){
    var responseData;
    models.User.findOne({
        where: {user_id: id}
    })
        .then(function(user){
            if(user==null || user.dataValues.user_pw!=pw){
                responseData = {'result':'no','flag':req.session.login};
                res.status(500).json(responseData);
                console.log('로그인 실패');
            } 
            else{
                req.session.login = true
                req.session.idx = user.dataValues.id
                responseData = {'result' : 'ok','session':req.session.login};
                res.status(200).json(responseData);
                console.log('로그인 성공');
            }
        }).catch(function(error){
            console.log(error);
        });
}
 
exports.login = login;