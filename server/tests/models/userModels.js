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
    phoneNumber: '07045678932',
  },

  validUser: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony2@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
    phoneNumber: '07045678932',
  },

  emptyFirstName: {
    firstName: '',
    lastName: 'Anwuka',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
    phoneNumber: '07045678932',
  },

  emptyLastName: {
    firstName: 'Anthony',
    lastName: '',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
    phoneNumber: '07045678932',
  },

  incompleteFirstName: {
    firstName: 'od',
    lastName: 'Anwuka',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
    phoneNumber: '07045678932',
  },

  incompleteLastName: {
    firstName: 'Anthony',
    lastName: 'An',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
    phoneNumber: '07045678932',
  },

  emptyEmail: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: '',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
    phoneNumber: '07045678932',
  },

  emptyPassword: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony1@gmail.com',
    password: '',
    address: '3 Demurin Street, Ketu',
    phoneNumber: '07045678932',
  },

  emptyAddress: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '',
    phoneNumber: '07045678932',
  },

  emptyPhone: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
    phoneNumber: '',
  },

  shortPassword: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony1@gmail.com',
    password: '123456',
    address: '3 Demurin Street, Ketu',
    phoneNumber: '07045678932',
  },

  invalidFirstName: {
    firstName: 'Ant77hony',
    lastName: 'Anwuka',
    email: 'anthony1@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
    phoneNumber: '07045678932',
  },

  invalidLastName: {
    firstName: 'Anthony',
    lastName: 'An77wuka',
    email: 'anthony1@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
    phoneNumber: '07045678932',
  },

  invalidEmail: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony#gmail#com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
    phoneNumber: '07045678932',
  },

  invalidPhone: {
    firstName: 'Anthony',
    lastName: 'Anwuka',
    email: 'anthony@gmail.com',
    password: '12345678',
    address: '3 Demurin Street, Ketu',
    phoneNumber: '070456789',
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
    email: 'bayo@admin.com',
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
