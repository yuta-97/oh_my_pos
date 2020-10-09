module.exports =(sequelize, DataTypes) => {
    const image = sequelize.define('Image', {
        path:{
            type:DataTypes.STRING,
        },
        goods_name: {
            type:DataTypes.STRING,
        },
    },{
        tableName: 'image',
    });
    return image;
};