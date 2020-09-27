
var Categorys = require('../models/category');

async function main(param, res){
    // 아무런 입력도없으면 전체 카테고리 리스트 전송
    if(param){
        category_name = param;
        Categorys.findOne({categoryname: category_name}, function(err, category){
            if(err) return res.status(500).json({result: 'FAIL', error: err});
            if(!category) return res.status(404).json({result: 'FAIL', error: 'Category not found'});
            
            res.status(200).json({category, id: category._id});
        });
    }else{
        Categorys.find({},function(err, cates){
            var cateMap = {};
            cates.forEach(function(cate){
                // 카테고리 id가 아니라 이름을 전송하기위해
                cateMap[cate._id]=cate.categoryname;
                console.log(cateMap);
            });
            res.send(cateMap);
        })
    }
}

module.exports = {
    main:main
}