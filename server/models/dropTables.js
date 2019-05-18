const dropUsers = 'DROP TABLE IF EXISTS users CASCADE;';
const dropLoans = 'DROP TABLE IF EXISTS loans CASCADE;';
const dropRepayments = 'DROP TABLE IF EXISTS repayments CASCADE;';

const dropQuery = `${dropUsers}${dropLoans}${dropRepayments}`;

export default dropQuery;
