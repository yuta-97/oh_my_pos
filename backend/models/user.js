module.exports =(sequelize, DataTypes) => {
    const user = sequelize.define('User', {
      user_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      user_pw: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      user_email: {
          type: DataTypes.STRING(30),
          allowNull: false
      }
    },{
        tableName: 'User',
    });
    
    return user;
};