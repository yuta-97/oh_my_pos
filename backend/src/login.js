const models = require('../models');
 
function login(req,res){
    if(!req.session.login){
        models.User.findOne({
          where: {user_id: req.body.id}
        })
          .then(function(user){
              if(user==null || user.dataValues.user_pw!=req.body.pw){
                  req.session.login = false;
                  req.session.save();
                  res.status(500).send(req.session.login);
                  console.log('로그인 실패');
              } 
              else{
                  req.session.user_id = user.dataValues.user_id;
                  req.session.login = true;
                  req.session.save();
                  res.status(200).send(req.session.login);
                  console.log('로그인 성공');
              }
          }).catch(function(error){
              console.log(error);
          });
        console.log('session_setted');
    }
}

function regist(req,res){
    console.log('regist rerquest!!');
    models.User.create({
      user_id: req.body.id,
      user_pw: req.body.pw,
      user_email: req.body.email
    }).then(() =>{
        res.status(200).json({result: 'OK'});
    }).catch(function(error){
        console.log(error);
        res.status(500).json({error});
    });
}

function islogin(req,res){
    if(req.session == null || !req.session.login){
        // 로그인 안됨
        res.send(false);
      }else{
        // 로그인 되어있음
        res.send(true);
      }
}
 
module.exports = {
    login,
    islogin,
    regist,
}