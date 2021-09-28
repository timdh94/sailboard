module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'None specified',
    },
    emailConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  
  User.associate = db => {
    db.User.hasMany(db.Keyboard);
    db.User.hasOne(db.Password);
    db.User.hasMany(db.Listing);
    db.User.hasMany(db.Bid);
    db.User.hasMany(db.SoldListing);
  };
  return User;
};