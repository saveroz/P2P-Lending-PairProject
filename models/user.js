'use strict';

const {GenerateSecret, EncryptPass} = require('../helper/encryptpass')

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
    email: {
      type : DataTypes.STRING,
      validate :{
        isEmail:{
          args : true,
          msg : 'Your email format is wrong please check again'
        }

      }},
    password: DataTypes.STRING,
    secret : DataTypes.STRING
  },
   { sequelize } )

  User.addHook('beforeCreate', (user)=>{

    let password = user.password
    let secret = GenerateSecret()
    user.password = EncryptPass(password,secret)
    user.secret = secret

  })

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