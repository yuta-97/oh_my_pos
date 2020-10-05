
module.exports =(sequelize, DataTypes) => {
    const goods = sequelize.define('Goods', {
      store_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      table_num: {
          type: DataTypes.STRING(30),
          allowNull: false
      },
      dis_name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      dis_rate: {
        type: DataTypes.FLOAT(5),
        allowNull: false
      },
    },{
        tableName: 'goods'
    });
    return store;
};