'use strict';
const {generatePass, checkPassword} = require('../helper/encryptpass')

const admin = [
  {
    name : 'admin',
    MoneyAmount:0,
    role :'admin',
    email : 'admin@gmail.com',
    password :generatePass("253062"),
    createdAt : new Date(),
    updatedAt : new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', admin, {} )

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {} )
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
