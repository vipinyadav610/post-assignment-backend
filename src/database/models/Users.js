const UserModal = (sequelize, DataTypes) => {
  var Users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING
  });

  Users.associate = function(models) {
    models.votes.belongsTo(models.users, {
      foreignKey: "user_id"
    });
  };

  return Users;
};
export default UserModal;
