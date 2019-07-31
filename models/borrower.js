'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Model = sequelize.Sequelize.Model

  class Borrower extends Model{

    static associate(models){
      
      Borrower.hasMany(models.UserToBorrower, {foreignKey : 'BorrowerId', sourceKey : 'id'})

    }

    ReceivedMoney(money){

     this.MoneyReceived+=money
     this.save()

    }

    ChangeStatus(){
      
      if (this.MoneyReceived >= this.BorrowedMoney){
        this.status = 'Funded'
        this.save()
      }
    }



  }

  Borrower.init({
    name: DataTypes.STRING,
    BorrowedMoney: DataTypes.INTEGER,
    deadline: DataTypes.STRING,
    bunga: DataTypes.INTEGER,
    status: DataTypes.STRING,
    MoneyReceived : DataTypes.INTEGER
  },{sequelize})

  // const Borrower = sequelize.define('Borrower', {
  //   name: DataTypes.STRING,
  //   BorrowedMoney: DataTypes.INTEGER,
  //   deadline: DataTypes.STRING,
  //   bunga: DataTypes.INTEGER,
  //   status: DataTypes.STRING
  // }, {});
  // Borrower.associate = function(models) {
  //   // associations can be defined here
  // };
  return Borrower;
};