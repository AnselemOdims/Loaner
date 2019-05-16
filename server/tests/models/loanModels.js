

// Test Mock Loan Models
const loans = {
  validLoan: {
    tenor: 12,
    amount: 50000,
  },

  excessTenor: {
    tenor: 15,
    amount: 50000,
  },

  invalidTenor: {
    tenor: '50w',
    amount: 50000,
  },

  lowAmount: {
    tenor: 12,
    amount: 4999,
  },

  excessAmount: {
    tenor: 12,
    amount: 100001,
  },

  wrongStatus: {
    status: 'not-approved' 
  },

  validStatus: {
    status: 'approved' 
  },

  validAmount: {
    paidAmount: 4375, 
  },

  incorrectAmount: {
    paidAmount: 2000,
  },

  excessRepayAmount: {
    paidAmount: 70000, 
  },

  invalidAmount: {
    paidAmount: 'w' 
  },

  zeroAmount: {
    paidAmount: 0 
  }
};

export default loans;
