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
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    region: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'None specified',
    },
  });
  
  User.associate = db => {
    db.User.hasMany(db.Keyboard);
    //db.User.hasMany(db.Keycap);
    db.User.hasOne(db.Password);
  };
  return User;
};