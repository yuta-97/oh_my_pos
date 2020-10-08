module.exports =(sequelize, DataTypes) => {
    const goods = sequelize.define('Goods', {
      goods_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER(20),
        allowNull: false
      },
      desc: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      category_name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      store_name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
    },{
        tableName: 'goods',
    });
    return goods;
};