
module.exports =(sequelize, DataTypes) => {
    const store = sequelize.define('Store', {
      store_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      table_num: {
          type: DataTypes.INTEGER(30),
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
      user_id:{
        type: DataTypes.STRING(20)
      }
    },{
        tableName: 'Store',
    });
    
    return store;
};