
var Categorys = require('../models/category');

async function main(args, res){

    var category = new Categorys({
        categoryname: args[0],
        options: args[1]
        // options:{
        //     optionname: args[1],
        //     optionprice: args[2]
        // }
    });

    category.save(function(err, category){
        if(err){
            res.satus(500).json({result:'FAIL'});
            return console.error(err);
        }
        console.dir(category);
        res.status(200).json({result:'OK', category/* 배포 후 삭제 */});
    });

}

module.exports = {
    main:main
}