'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Comments',  'UserId',
      {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      } 
      ),

    ])
  },
  
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};