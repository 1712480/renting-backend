module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Hung',
        phone: '0927563829',
        email: 'hung@mail.com',
        password: '$2b$10$Ppz.Xv0kJLBP6JmoGfs6ceG4/2VGRoo5xcP0aYlcMt8DJ6z79tgKC',
        role: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kha',
        phone: '0927563229',
        email: 'kha@mail.com',
        password: '$2b$10$Ppz.Xv0kJLBP6JmoGfs6ceG4/2VGRoo5xcP0aYlcMt8DJ6z79tgKC',
        role: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
