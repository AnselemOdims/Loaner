import dotenv from 'dotenv';


dotenv.config();

const adminPassword = process.env.ADMIN_PASSWORD;

// Test Mock User Models
const users = {

  valid: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
  },

  validUser: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony2@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
  },

  emptyFirstName: {
    firstName: '',
    lastName: 'Anwuka',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
  },

  emptyLastName: {
    firstName: 'Anthony',
    lastName: '',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
  },

  incompleteFirstName: {
    firstName: 'od',
    lastName: 'Anwuka',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
  },

  incompleteLastName: {
    firstName: 'Anthony',
    lastName: 'An',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
  },

  emptyEmail: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: '',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
  },

  emptyPassword: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony1@gmail.com',
    password: '',
    address: '3 Demurin Street, Ketu',
  },

  emptyAddress: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '',
  },

  emptyPhone: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
  },

  shortPassword: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony1@gmail.com',
    password: '123456',
    address: '3 Demurin Street, Ketu',
  },

  invalidFirstName: {
    firstName: 'Ant77hony',
    lastName: 'Anwuka',
    email: 'anthony1@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
  },

  invalidLastName: {
    firstName: 'Anthony',
    lastName: 'An77wuka',
    email: 'anthony1@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
  },

  invalidEmail: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony#gmail#com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
  },

  invalidPhone: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
  },

  login: {
    email: 'anthony@gmail.com',
    password: '12345678',
  },

  emptyLoginEmail: {
    email: '',
    password: '12345678',
  },

  emptyLoginPassword: {
    email: 'anthony@gmail.com',
    password: '',
  },

  incompleteLoginPassword: {
    email: 'anthony@gmail.com',
    password: '12345',
  },

  invalidLoginEmail: {
    email: 'anthony*gmail#com',
    password: '12345',
  },

  incorrectPassword: {
    email: 'anthony@gmail.com',
    password: '123452816',
  },

  notRegistered: {
    email: 'john@gmail.com',
    password: '123452816',
  },

  adminLogin: {
    email: 'anselemodims@gmail.com',
    password: `${adminPassword}`,
  },

  verified: {
    status: 'verified',
  },

  wrongStatus: {
    status: 'verif',
  },
};

export default users;
