module.exports =(sequelize, DataTypes) => {
    const image = sequelize.define('Image', {
        file_name:{
            type:DataTypes.STRING,
        },
        goods_name: {
            type:DataTypes.STRING,
        },
    },{
        tableName: 'Image',
    });
    return image;
};