'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model

  class UserToBorrower extends Model { 

    static associate(models){

      UserToBorrower.belongsTo(models.User,{foreignKey:'UserId', targetKey:'id'} )
      UserToBorrower.belongsTo(models.Borrower,{ foreignKey:'BorrowerId', targetKey:'id'} )
      
    }


  }

  UserToBorrower.init({
    UserId: DataTypes.INTEGER,
    BorrowerId: DataTypes.INTEGER,
    GivenMoney : DataTypes.INTEGER
  },{sequelize})

  // const UserToBorrower = sequelize.define('UserToBorrower', {
  //   UserId: DataTypes.INTEGER,
  //   LenderId: DataTypes.INTEGER
  // }, {});
  // UserToBorrower.associate = function(models) {
  //   // associations can be defined here
  // };
  return UserToBorrower;
};