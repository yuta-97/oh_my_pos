var Categorys = require('../models/category');

async function main(args, res){

    Categorys.findOneAndUpdate({categoryname: args[0]}, {$push:{ options: args[1] }}, function(err, doc){
        if(err){
            // 수정필요. 처음 등록시 findoneandupdate가 안되서 임시방편.
            var category = new Categorys({
                categoryname: args[0],
                options: args[1]
            });
            category.save();
            res.json({result:'Category not found!! Added new data!!'});
        }
        if(doc){
            console.log(doc);
            res.status(200).json({result:'UPDATE OK', doc});
        }
    });
}

module.exports = {
    main:main
}