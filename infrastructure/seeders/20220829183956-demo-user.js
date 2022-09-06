'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Ade',
      lastName: 'Sender',
      email: 'sender@example.test',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Ade',
      lastName: 'Receiver',
      email: 'receiver@example.test',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};