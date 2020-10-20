module.exports=(sequelize, DataTypes)=>{
    const option = sequelize.define('Option',{
        order_id:{
            type: DataTypes.INTEGER(15),
            allowNull: false,
        },
        option_name:{
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        option_price:{
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    });

    return option
}