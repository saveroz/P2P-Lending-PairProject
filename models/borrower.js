'use strict';
module.exports = (sequelize, DataTypes) => {
  const moment = require('moment')
  const Model = sequelize.Sequelize.Model

  class Borrower extends Model{

    static associate(models){
      
      Borrower.hasMany(models.UserToBorrower, {foreignKey : 'BorrowerId', sourceKey : 'id'})

    }

    sisaHari(){
      let hasil = ""
      let deadline = moment(this.batasKumpul);
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth()).padStart(2, '0');
      let yyyy = today.getFullYear();
      let now = moment([yyyy,mm,dd]);
      let sisa = deadline.diff(now, 'days')
      if(sisa===null){
        hasil = "Expired"
      } else {
        hasil = sisa
      }
      return hasil
    }

    progressBar(){
      return Number((this.MoneyReceived/this.BorrowedMoney*100)).toFixed(2)+"%";
    }

    sisaNilai(){
      return Number((this.BorrowedMoney-this.MoneyReceived));
    }


    ReceivedMoney(money){
     this.MoneyReceived+=money
     this.save()

    }

    ChangeStatus(){
      if (this.MoneyReceived >= this.BorrowedMoney){
        this.status = 'Funded'
      } else {
        this.status = 'Progress'
      }
      return this.status
    }



  }

  Borrower.init({
    name: DataTypes.STRING,
    BorrowedMoney: DataTypes.INTEGER,
    deadline: DataTypes.STRING,
    bunga: DataTypes.INTEGER,
    status: DataTypes.STRING,
    batasKumpul: DataTypes.DATEONLY,
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
