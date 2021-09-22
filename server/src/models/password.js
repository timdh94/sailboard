module.exports = (sequelize, DataTypes) => {
  const Password = sequelize.define('Password', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
  Password.associate = db => {
    db.Password.belongsTo(db.User, {
      onDelete: 'CASCADE',
      foreignKey: { allowNull: false }
    });
  };
  return Password;
}