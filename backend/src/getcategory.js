
var Categorys = require('../models/category');

async function main(param, res){
    
    category_name = param;

    Categorys.findOne({categoryname: category_name}, function(err, category){
        if(err) return res.status(500).json({result: 'FAIL', error: err});
        if(!category) return res.status(404).json({result: 'FAIL', error: 'Category not found'});
        res.status(200).json({category, id: category._id});
    });
}

module.exports = {
    main:main
}