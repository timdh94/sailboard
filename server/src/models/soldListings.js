module.exports = (sequelize, DataTypes) => {
  const SoldListing = sequelize.define('SoldListing', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    soldPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BidderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  SoldListing.associate = db => {
    db.SoldListing.belongsTo(db.User, {
      onDelete: 'CASCADE',
      foreignKey: { allowNull: false }
    });
    db.SoldListing.belongsTo(db.Keyboard, {
      foreignKey: { allowNull: true }
    });
  };
  return SoldListing;
};