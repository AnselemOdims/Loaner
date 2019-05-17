import Helpers from '../utils/helpers';

// Database for storage of datas
const db = {
  users: [
    {
      id: 1,
      firstName: 'Bayo',
      lastName: 'Admin',
      email: 'bayo@admin.com',
      password: Helpers.adminPassword(),
      isAdmin: true,
    },
  ],
  loans: [],
  repayments: [],
};

export default db;
