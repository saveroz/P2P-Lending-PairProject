'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    // renameColumn(tableName: string, attrNameBefore: string, attrNameAfter: string, options: Object)
    return queryInterface.renameColumn('UserToBorrowers','LenderId','BorrowerId')
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
