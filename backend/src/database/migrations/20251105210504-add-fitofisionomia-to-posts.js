'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Posts', 'fitofisionomia', {
      type: Sequelize.STRING,
      allowNull: true, // Set to false if the field is required
      after: 'biome' // Optional: position the new column after the biome column
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'fitofisionomia');
  }
};
