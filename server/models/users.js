

Users = (sequelize, DataTypes) => {
    const Users=sequelize.define("Users",{
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        postCount:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    })
    return Users;

};

module.exports=Users