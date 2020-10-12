
const models = require('../models');

function setcategory(req, res) {

    models.Category.create({
        category_name: req.body.category_name,
        option_name: req.body.option_name,
        option_price: req.body.option_price,
        store_name: req.session.store_name
    }).then((result) => {
        console.log(result);
        console.log("카테고리 등록 완료!");
        res.status(200).json({ result: 'OK' });
    }).catch(function (error) {
        console.log(error);
        res.json({ error });
    });
}

function getcategoryname(req, res) {

    models.Category.findAll({
        where: {
            store_name: req.session.store_name,
        },
        attributes: [models.sequelize.fn('DISTINCT', models.sequelize.col('category_name')), 'category_name']
    }).then((result) => {
        var data = JSON.parse(JSON.stringify(result));
        res.status(200).json(data);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ error });
    });
}

function getcategory(req, res) {

    models.Category.findAll({
        where: {
            store_name: req.session.store_name,
        },
        attributes: ['category_name', 'option_name', 'option_price']
    }).then((result) => {
        var data = JSON.parse(JSON.stringify(result));
        res.status(200).json(data);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ error });
    });
}

function deletecategory(req, res) {
    models.Category.destroy({
        where: {
            category_name: req.body.category_name
        },
    }).then((result) => {
        res.send(true);
        console.log("delete categorys.");
    }).catch(function (error) {
        console.log(error);
        res.send(false);
    });
    models.Goods.destroy({
        where: {
            category_name: req.body.category_name
        },
    }).then((result) => {
        console.log("delete Goods cascade..");
        res.json(result);
    }).catch(function (error) {
        console.log(error);
        res.json({ error });
    });
}
function updatecategory(req, res) {
    models.Category.update({
        category_name: req.body.category_name,
        option_name: req.body.option_name,
        option_price: req.body.option_price
    }, {
        where: {
            store_name: req.session.store_name,
            category_name: req.body.cur_category_name,
            option_name: req.body.cur_option_name
        }
    }).then((result) => {
        console.log(result);
    }).catch(function (error) {
        console.log(error);
        res.send(false);
    });

    models.Goods.update({
        category_name: req.body.category_name
    }, {
        where: {
            category_name: req.body.cur_category_name
        }
    }).then((result) => {
        console.log(result);
        res.send(true);
    }).catch(function (error) {
        console.log(error);
        res.send(false);
    });

}

module.exports = {
    setcategory,
    getcategory,
    getcategoryname,
    deletecategory,
    updatecategory,
}
