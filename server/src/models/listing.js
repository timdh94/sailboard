module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    buyItNowPrice: {
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    sellerName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    itemLocation: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
  });
  Listing.associate = db => {
    db.Listing.belongsTo(db.User, {
      onDelete: 'CASCADE',
      foreignKey: { allowNull: false }
    });
    db.Listing.belongsTo(db.Keyboard, {
      onDelete: 'CASCADE',
      foreignKey: { allowNull: false }
    });
  }
  return Listing
};