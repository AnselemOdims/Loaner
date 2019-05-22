const createRepayments = `INSERT INTO repayments(loanId, createdOn, amount, monthlyInstallment, paidAmount, balance) 
VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;

const retrieveRepayments = 'SELECT * FROM repayments WHERE loanid=$1';


export {
  createRepayments, retrieveRepayments,
};