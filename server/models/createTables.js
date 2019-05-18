const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL UNIQUE PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    address VARCHAR(200) NOT NULL,
    phoneNumber NUMERIC,
    status VARCHAR(20) DEFAULT 'unverified',
    isAdmin BOOLEAN DEFAULT FALSE);`;

const createLoansTable = `
    CREATE TABLE IF NOT EXISTS loans(
    id SERIAL UNIQUE PRIMARY KEY,
    userEmail VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    repaid BOOLEAN DEFAULT FALSE,
    tenor INT NOT NULL,
    amount NUMERIC NOT NULL,
    paymentInstallment NUMERIC NOT NULL,
    balance NUMERIC NOT NULL,
    interest NUMERIC NOT NULL);`;

const createRepaymentTable = `
    CREATE TABLE IF NOT EXISTS repayments(
    id SERIAL UNIQUE PRIMARY KEY,
    loanId INT NOT NULL REFERENCES loans(id) ON DELETE CASCADE ON UPDATE CASCADE,
    createdOn DATE DEFAULT CURRENT_TIMESTAMP,
    amount NUMERIC NOT NULL,
    monthlyInstallment NUMERIC NOT NULL,
    paidAmount NUMERIC NOT NULL,
    balance NUMERIC NOT NULL);`;
const createTables = `${createUsersTable}${createLoansTable}${createRepaymentTable}`;

export default createTables;