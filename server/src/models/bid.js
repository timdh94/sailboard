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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No message'
    },
    bidderLocation: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    SellerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  Bid.associate = db => {
    db.Bid.belongsTo(db.User, {
      onDelete: 'CASCADE',
      foreignKey: { allowNull: false }
    });
    db.Bid.belongsTo(db.Listing, {
      onDelete: 'CASCADE',
      foreightKey: { allowNull: false }
    });
  }
  return Bid;
};