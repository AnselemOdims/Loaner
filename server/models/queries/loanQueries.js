const loanQueries = {
  // create a loan query
  createLoan: `INSERT INTO loans(userEmail, createdOn, tenor, amount, paymentInstallment, balance, interest) 
             VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING userEmail, createdOn, status, repaid, tenor, amount, paymentInstallment, balance, interest`,

  // get loan with user email query
  getLoanByEmail: 'SELECT * FROM loans WHERE userEmail = $1',

  // get all loans
  getAllLoans: 'SELECT * FROM loans',

  // get a specific loan with loan id
  getLoanById: 'SELECT * FROM loans WHERE id=$1',

  // get all loans with status and repaid
  queryAllLoans: 'SELECT * FROM LOANS WHERE status=$1 AND repaid=$2',

  // update loan status query
  changeLoanStatus: 'UPDATE loans SET status=$1 WHERE id=$2',

  // update loan balance query
  updateBalance: 'UPDATE loans SET balance = $1 WHERE id=$2',

  // update repaid query
  updateRepaid: 'UPDATE loans SET repaid=true WHERE id=$1',

};

export default loanQueries;
