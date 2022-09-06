'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('credentials', [{
      userId: 1,
      public: '251c042630d41504b8bb8afe4b080addfc533d610d8770d3a6d8f45eb54ff0b650f3cde95e447f8fb9302df79c7aa5a91a1dfbe6c5d0281e882879a08f7dc2d3',
      secret: '880b5a1de03ccb1886518b1beadbf2924e6a21e33c288a7d3fc4c4527e9f30ab891ae9a38e31a373a415a9bdf6fc0e961ae8a6fd11c06d212460def4e7c96882',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('credentials', null, {});
  }
};