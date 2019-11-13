module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Pista', 'fk_files_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Pista', 'fk_files_id');
  },
};
