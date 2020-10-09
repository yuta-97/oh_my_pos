const models = require('../models');

function saveimage(req, res){
    
    models.Image.create({
        path: req.file.path,
        goods_name: req.body.goods_name
    }).then(()=>{
        res.send(true);
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });
}

function getimagename(req,res){
    models.Image.findAll({
        where:{
            goods_name: req.body.goods_name
        },
        attributes: ['path']
    }).then((result) => {
        var imgpath = JSON.parse(JSON.stringify(result));
        console.log(imgpath);
        res.send(imgpath[0].path);
        console.log("find Image success.");
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });
}

module.exports = {
    saveimage,
    getimagename,
}
