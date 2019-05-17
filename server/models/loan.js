import UserModel from './users';
import db from './db';
import Helpers from '../utils/helpers';

const { users, loans } = db;

/**
 * @class - Loan
 * @description specifies which method is used by the loan controller
 * @exports Loan
 */
class Loan {
  /**
   * @method createLoans
   * @description - Creates a new loan application
   * @param {object} data - The Request data Object
   * @param {object} payload - The User payload
   * @returns {object} - The new loan application
   */
  static async createLoans(data, payload) {
    const { email } = payload;
    const user = await Helpers.findByMail(email, users);
    const { firstName, lastName } = user;
    const { tenor, amount } = data;
    const interest = 0.05 * parseInt(amount, 10);
    const balance = parseInt(amount, 10) + interest;
    const monthlyInstallment = balance / parseInt(tenor, 10);
    const loan = {
      id: loans.length + 1,
      firstName,
      lastName,
      email,
      tenor,
      amount,
      monthlyInstallment,
      repaid: false,
      status: 'pending',
      balance,
      interest,
      createdOn: new Date(),
    };
    db.loans.push(loan);
    return loan;
  }

  /**
   * @method updateStatus
   * @description - Updates loan status
   * @param {Number} id - The Loan ID
   * @param {object} data - The  Loan Status
   * @returns {object} - The Updated Loan
   */
  static async updateStatus(id, data) {
    const loan = await Helpers.findById(id, loans);
    loan.status = data;
    return loan;
  }
}

export default Loan;
