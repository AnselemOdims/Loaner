import UserModel from './users';

/**
 * @class - Loan
 * @description specifies which method is used by the loan controller
 * @exports Loan
 */
class Loan {
  constructor() {
    this.loans = [];
  }

  /**
   * @method createLoans
   * @description - Creates a new loan application
   * @param {object} data - The Request data Object
   * @param {object} payload - The User payload
   * @returns {object} - The new loan application
   */
  async createLoans(data, payload) {
    const { email } = payload;
    const user = await UserModel.users.find(user => user.email === email);
    const { id, firstName, lastName } = user;
    const { tenor, amount, balance } = data;
    const interest = 0.05 * amount;
    const monthlyInstallment = (amount + interest) / tenor;
    const loan = {
      loanId: this.loans.length + 1,
      userId: id,
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
    this.loans.push(loan);
    return loan;
  }

  /**
   * @method getAll
   * @description - Retrieves all users
   * @returns {object} - All loan applications
   */
  async getAll() {
    const loans = await this.loans;
    return loans;
  }

  /**
   * @method getOne
   * @param {Number} id - The Loan Id
   * @returns {object} - The Specific loan
   */
  async getOne(id) {
    const loaner = await this.loans.find(loan => loan.loanId === id);
    return loaner;
  }

  /**
   * @method updateStatus
   * @description - Updates loan status
   * @param {Number} id - The Loan ID
   * @param {object} data - The  Loan Status
   * @returns {object} - The Updated Loan
   */
  async updateStatus(id, data) {
    const loan = await this.getOne(id);
    loan.status = data;
    return loan;
  }

  /**
   * @method updatePay
   * @description - Updates the loan repaid
   * @param {Number} id - The Loan Id
   * @param {object} data - The Repaid value
   * @return {object} - The Updated Loan
   */
  async updatePay(id, data) {
    const loan = await this.getOne(id);
    loan.repaid = data;
    return loan;
  }
}

export default new Loan();
