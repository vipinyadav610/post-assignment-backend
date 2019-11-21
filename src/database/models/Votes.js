const VotesModal = (sequelize, DataTypes) => {
  var Votes = sequelize.define("votes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    }
  });

  Votes.associate = function(models) {
    models.users.hasMany(models.votes, {
      foreignKey: "user_id"
    });
    models.posts.hasMany(models.votes, {
      foreignKey: "post_id"
    });
  };

  return Votes;
};
export default VotesModal;
