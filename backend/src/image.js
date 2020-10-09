const models = require('../models');

function saveimage(req, res){
    
    models.Image.create({
        file_name: req.file.filename,
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
        attributes: ['file_name']
    }).then((result) => {
        var fname = JSON.parse(JSON.stringify(result));
        console.log(fname);
        res.send(fname[0].file_name);
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
