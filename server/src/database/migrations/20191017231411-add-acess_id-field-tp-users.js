module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'acess_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'acess_id');
  },
};
