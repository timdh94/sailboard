module.exports = (sequelize, DataTypes) => {
  const Bid = sequelize.define('Bid', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    counterOffer: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Bid.associate = db => {
    db.Bid.belongsTo(db.User, {
      onDelete: 'CASCADE',
      foreignKey: { allowNull: false }
    });
  }
  return Bid;
};