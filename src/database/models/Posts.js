const postModal = (sequelize, DataTypes) => {
  var Posts = sequelize.define("posts", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    name: DataTypes.STRING
  });

  Posts.associate = function(models) {
    models.votes.belongsTo(models.posts, {
      foreignKey: "post_id"
    });
  };

  return Posts;
};
export default postModal;
