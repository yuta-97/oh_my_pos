module.exports =(sequelize, DataTypes) => {
    const image = sequelize.define('Image', {
        type: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        goods_name:{
            type:DataTypes.STRING,
        },
        data: {
            type: DataTypes.BLOB("long"),
        },
    },{
        tableName: 'image',
    });
    return image;
};