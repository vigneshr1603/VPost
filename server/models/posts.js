

Posts = (sequelize, DataTypes) => {
    const Posts=sequelize.define("Posts",{

        
          postText: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    });
    
    Posts.associate = (models) => {
      Posts.hasMany(models.Comments, {
        onDelete: "cascade",
      });
      Posts.hasMany(models.Likes, {
        onDelete: "cascade",
      });
    };
    return Posts;
};

module.exports=Posts;