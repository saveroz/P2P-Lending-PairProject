'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addConstraint('UserToBorrowers',['UserId','BorrowerId'],{
      type:'unique',
      name : 'uniqueUserBorrower'
    })
   
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeConstraint('UserToBorrowers', 'uniqueUserBorrower')
    
  }
};
