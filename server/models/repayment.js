import LoanModel from './loan';
import db from './db';
import Helpers from '../utils/helpers';

const { loans, repayments } = db;
/**
 * @class Repayments
 * @description - The lon repayment class
 * @exports Repayments
 */
class Repayments {
  /**
   * @method create
   * @description - Creates a repayment record
   * @param {Number} id - The Loan Id
   * @param {object} data - The Request data
   * @returns {object} - The Repayment record
   */
  static async create(id, data) {
    const loan = await Helpers.findById(Number(id), loans);
    const { paidAmount } = data;
    loan.balance -= parseInt(paidAmount, 10);
    const repayment = {
      id: repayments.length + 1,
      loanId: loan.id,
      createdOn: new Date(),
      amount: loan.amount,
      monthlyInstallment: loan.monthlyInstallment,
      interest: loan.interest,
      paidAmount,
      balance: loan.balance,
    };
    repayments.push(repayment);
    return repayment;
  }

  /**
   * @method getOne
   * @param {Number} id - The Repayment Id
   * @returns {object} - The Specific repayment record
   */
  static async getOne(value) {
    const loan = await Helpers.findById(Number(value), loans);
    const { id } = loan;
    const repayment = await repayments.filter(repayments => repayments.loanId === id);
    return repayment;
  }
}

export default Repayments;
