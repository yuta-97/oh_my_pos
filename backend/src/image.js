const models = require('../models');

function saveimage(req, res){

    models.Image.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: req.file.filename,
        goods_name: req.file.goods_name
    }).then((result)=>{
        console.log(result);
        console.log("Image saved!!");
        res.status(200).json({result:'OK'});
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });
}

function getimage(req,res){
    models.Image.findAll({
        where:{
            goods_name: req.body.goods_name
        }
    }).then((result) => {
        console.log("find Image success.");
        // var data = JSON.parse(JSON.stringify(result));
        res.send(result.data);
    }).catch(function(error){
        console.log(error);
        res.json({error});
    });
}

module.exports = {
    saveimage,
    getimage,
}
