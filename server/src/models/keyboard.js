module.exports = (sequelize, DataTypes) => {
  const Keyboard = sequelize.define('Keyboard', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    boardName: {
      type: DataTypes.STRING(75),
      allowNull: false,
    },
    isSplit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    boardSize: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: '100%'
    },
    manufacturer: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'unknown',
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    switches: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'none'
    },
    image: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  });
  Keyboard.associate = db => {
    db.Keyboard.belongsTo(db.User, {
      onDelete: 'CASCADE',
      foreignKey: { allowNull: false }
    });
    db.Keyboard.hasOne(db.Listing, {
      onDelete: 'CASCADE',
    });
    db.Keyboard.hasOne(db.SoldListing);
  };
  return Keyboard;
};