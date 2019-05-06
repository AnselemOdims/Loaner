import LoanModel from '../models/loan';

/**
 * @class Repayments
 * @description - The lon repayment class
 * @exports Repayments
 */
class Repayments {
  constructor() {
    this.repayments = [];
  }

  /**
   * @method create
   * @description - Creates a repayment record
   * @param {Number} id - The Loan Id
   * @param {object} data - The Request data
   * @returns {object} - The Repayment record
   */
  async create(id, data) {
    const loan = await LoanModel.loans.find(loans => loans.loanId === id);
    const { paidAmount } = data; 
    const { loanId, amount, monthlyInstallment, interest } = loan;
    const balance = (amount + interest) - paidAmount;   
    const repayment = {
      id: this.repayments.length + 1,
      loanId,
      createdOn: new Date,
      amount,
      monthlyInstallment,
      interest,
      paidAmount,
      balance,
    }
    this.repayments.push(repayment);
    return repayment;
  }

  /**
   * @method getOne
   * @param {Number} id - The Repayment Id
   * @returns {object} - The Specific repayment record 
   */
  async getOne(id) {
    const loan = await LoanModel.loans.find(loans => loans.loanId === id);
    const { loanId } = loan;
    const repayment = await this.repayments.find(record => record.loanId === loanId);
    return repayment;
  }
}

export default new Repayments();