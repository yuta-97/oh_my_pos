
var Goods = require('../models/goods');
var Categorys = require('../models/category');

async function main(args, res){
    
    var category_name = args[1];

    // 입력한 카테고리가 유효한지 검색.
    Categorys.findOne({categoryname: category_name}, function(err, category){
        if(err) return res.status(500).json({result: 'FAIL', error: err});
        if(!category) return res.status(404).json({result: 'FAIL', error: 'Category not found'});

        // 있는 데이터라면, 객체 생성 후 입력.
        // 카테고리 명, 카테고리 ID를 함께 저장한다. -> 스키마를 효율적으로 쓰기위해!
        var id = category.id;
        var goods = new Goods({
            goodsname: args[0],
            type: {categoryname: category_name, categoryid: id},
            price: args[2],
            desc: args[3]
        });
    
        goods.save(function(err, goods){
            if(err){
                res.json({result:'FAIL'});
                return console.error(err);
            }
            console.dir(goods);
            res.status(200).json({result:'OK', goods/** 배포 후 삭제할 것 */});
        });
    });

    
    
}

module.exports = {
    main:main
}