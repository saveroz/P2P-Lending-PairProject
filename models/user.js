'use strict';

const {GenerateSecret, EncryptPass} = require('../helper/encryptpass')

module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model

  class User extends Model{

    static associate(models){

      User.hasMany(models.UserToBorrower, {foreignKey : 'UserId', sourceKey : 'id'})

    }

    Sendmoney(money){

      if (this.MoneyAmount-money>=0){
        this.MoneyAmount -= money
        this.save()
      }
      else{
        throw new Error("You dont have enough money")
      }

    }

  }

  User.init ( {    
    name: DataTypes.STRING,
    MoneyAmount: {
      type:DataTypes.INTEGER,
      validate :{
        isInt : {
          args : true,
          msg :'please input number'
        },
        min :{
          args : 1000,
          msg : 'minimal top up 1000' 
        },
        max : {
          args : 100000000,
          msg : 'maksimal top up adalah 100000000'
        }
      }
    },
    role: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate :{
        isEmail:{
          args : true,
          msg : 'Your email format is wrong please check again'
        },
        isUnique : function(value){

          User.findOne({
            where : {email:value} 
          }).then((data)=>{
            if (data){
              throw new Error('Email has been used by another person') }
            
              else{
                next()
            }
          }).catch((err)=>{
            throw err;
          }) 
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