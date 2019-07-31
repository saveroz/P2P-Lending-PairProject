'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model

  class User extends Model{

    static associate(models){

      User.hasMany(models.UserToBorrower, {foreignKey : 'UserId', sourceKey : 'id'})

    }


  }

  User.init ( {    
    name: DataTypes.STRING,
    MoneyAmount: DataTypes.INTEGER,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { sequelize } )


  // const User = sequelize.define('User', {
  //   name: DataTypes.STRING,
  //   MoneyAmount: DataTypes.INTEGER,
  //   role: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {});
  // User.associate = function(models) {
  //   // associations can be defined here
  // };
  return User;
};