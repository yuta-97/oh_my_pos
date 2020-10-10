module.exports =(sequelize, DataTypes) => {
    const category = sequelize.define('Category', {
      category_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      option_name: {
          type: DataTypes.STRING(30),
          allowNull: false
      },
      option_price: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      store_name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
    },{
        tableName: 'Category',
    });
    return category;
};