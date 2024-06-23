const bcrypt = require('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Users', [{
        email: 'agif@student.unand.ac.id',
        nama: 'agif',
        nim: '2211522031',
        password: await bcrypt.hash('agif',10),
        departement:'Sistem Informasi',
        role:'mahasiswa',
        create_at: new Date(),
        update_at: new Date(),
      },
      {
        email: 'admin@gmail.com',
        nama: 'admin',
        password: await bcrypt.hash('admin',10),
        departement:'administrasi',
        role:'admin',
        create_at: new Date(),
        update_at: new Date(),
       }
   
   
   ],{});
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
