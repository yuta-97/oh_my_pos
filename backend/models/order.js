module.exports=(sequelize, DataTypes)=>{
    const order = sequelize.define('Order',{
        store_name :{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        table_num:{
            type: DataTypes.INTEGER(30),
            allowNull: false,
        },
        goods_name:{
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        count:{
            type: DataTypes.INTEGER(30),
            allowNull: false,
        },
        price:{
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        sum_price:{
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        isdone:{
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return order
}